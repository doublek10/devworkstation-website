<?php
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/db.php';

send_cors_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    json_response(['success' => false, 'message' => 'Invalid request body'], 400);
}

$firstname = trim((string)($input['firstname'] ?? ''));
$lastname  = trim((string)($input['lastname'] ?? ''));
$surname   = trim((string)($input['surname'] ?? ''));
$email     = trim((string)($input['email'] ?? ''));
$phoneRaw  = trim((string)($input['mpesa_number'] ?? ''));

if ($firstname === '' || $lastname === '' || $surname === '' || $email === '' || $phoneRaw === '') {
    json_response(['success' => false, 'message' => 'All fields are required.'], 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['success' => false, 'message' => 'Please enter a valid email address.'], 422);
}

$msisdn = normalize_msisdn($phoneRaw);
if ($msisdn === null) {
    json_response(['success' => false, 'message' => 'Please enter a valid Safaricom M-Pesa number.'], 422);
}

$id = generate_record_id();
$amountKes = (int) round(PRICE_USD * USD_TO_KES_RATE);

$db = get_db();

// 1) Save the record first, status pending, before touching M-Pesa.
$stmt = $db->prepare(
    'INSERT INTO keyactive (id, firstname, lastname, surname, email, mpesa_number, amount, status)
     VALUES (:id, :firstname, :lastname, :surname, :email, :mpesa_number, :amount, "pending")'
);
$stmt->execute([
    ':id'           => $id,
    ':firstname'    => $firstname,
    ':lastname'     => $lastname,
    ':surname'      => $surname,
    ':email'        => $email,
    ':mpesa_number' => $msisdn,
    ':amount'       => $amountKes,
]);

// 2) Initiate the STK push.
try {
    $mpesa = initiate_stk_push(
        $msisdn,
        $amountKes,
        'DEVWS-' . substr($id, 0, 8),
        'DevWorkstation activation key'
    );
} catch (Throwable $e) {
    json_response(['success' => false, 'message' => 'Could not start the M-Pesa payment. Please try again.'], 502);
}

if (!isset($mpesa['CheckoutRequestID'])) {
    $reason = $mpesa['errorMessage'] ?? ($mpesa['CustomerMessage'] ?? 'M-Pesa did not accept the request.');
    json_response(['success' => false, 'message' => $reason], 502);
}

// 3) Save the checkout id for the webhook to match against later.
$update = $db->prepare('UPDATE keyactive SET mpesa_checkout_id = :checkout_id WHERE id = :id');
$update->execute([
    ':checkout_id' => $mpesa['CheckoutRequestID'],
    ':id'          => $id,
]);

json_response([
    'success'     => true,
    'id'          => $id,
    'checkout_id' => $mpesa['CheckoutRequestID'],
    'message'     => 'STK push sent. Enter your M-Pesa PIN to complete payment.',
]);
