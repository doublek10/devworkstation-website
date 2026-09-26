<?php
// This endpoint is called by Safaricom's servers, not the browser — no CORS needed.
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/db.php';

$raw = file_get_contents('php://input');
error_log('[mpesa-callback] ' . $raw); // keep a raw log while integrating; safe to remove later

$payload = json_decode($raw, true);
$callback = $payload['Body']['stkCallback'] ?? null;

if (!$callback || !isset($callback['CheckoutRequestID'])) {
    // Always acknowledge with 200 so Safaricom doesn't keep retrying a malformed hit.
    json_response(['ResultCode' => 0, 'ResultDesc' => 'Ignored: no CheckoutRequestID']);
}

$checkoutId = $callback['CheckoutRequestID'];
$resultCode = $callback['ResultCode'] ?? 1;

$db = get_db();
$stmt = $db->prepare('SELECT * FROM keyactive WHERE mpesa_checkout_id = :checkout_id LIMIT 1');
$stmt->execute([':checkout_id' => $checkoutId]);
$record = $stmt->fetch();

if (!$record) {
    json_response(['ResultCode' => 0, 'ResultDesc' => 'Ignored: unknown CheckoutRequestID']);
}

if ((int)$resultCode !== 0) {
    // Payment failed or was cancelled — leave status as pending; the customer can retry.
    json_response(['ResultCode' => 0, 'ResultDesc' => 'Acknowledged: payment not completed']);
}

// Pull Amount and MpesaReceiptNumber out of CallbackMetadata.
$metaItems = $callback['CallbackMetadata']['Item'] ?? [];
$meta = [];
foreach ($metaItems as $item) {
    if (isset($item['Name'])) {
        $meta[$item['Name']] = $item['Value'] ?? null;
    }
}

$amountPaid = $meta['Amount'] ?? $record['amount'];
$mpesaReference = $meta['MpesaReceiptNumber'] ?? null;

// Already processed (Safaricom can call back more than once) — don't regenerate the key.
if ($record['status'] === 'paid') {
    json_response(['ResultCode' => 0, 'ResultDesc' => 'Already processed']);
}

$activationKey = generate_activation_key();

$update = $db->prepare(
    'UPDATE keyactive
     SET mpesa_reference = :reference, amount = :amount, status = "paid", activation_key = :key
     WHERE id = :id'
);
$update->execute([
    ':reference' => $mpesaReference,
    ':amount'    => $amountPaid,
    ':key'       => $activationKey,
    ':id'        => $record['id'],
]);

send_key_email($record['email'], $record['firstname'], $activationKey);

json_response(['ResultCode' => 0, 'ResultDesc' => 'Processed']);
