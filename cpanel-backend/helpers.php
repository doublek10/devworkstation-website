<?php
require_once __DIR__ . '/config.php';

function send_cors_headers(): void
{
    header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function json_response(array $data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

/** 32-char hex id — random and effectively unguessable. */
function generate_record_id(): string
{
    return bin2hex(random_bytes(16));
}

/** 64-char hex activation key. */
function generate_activation_key(): string
{
    return bin2hex(random_bytes(32));
}

/** Normalize a Kenyan phone number to Safaricom's 2547XXXXXXXX / 2541XXXXXXXX format. */
function normalize_msisdn(string $raw): ?string
{
    $digits = preg_replace('/\D+/', '', $raw);
    if (preg_match('/^0(7|1)\d{8}$/', $digits)) {
        return '254' . substr($digits, 1);
    }
    if (preg_match('/^254(7|1)\d{8}$/', $digits)) {
        return $digits;
    }
    if (preg_match('/^(7|1)\d{8}$/', $digits)) {
        return '254' . $digits;
    }
    return null;
}

function get_mpesa_access_token(): string
{
    $ch = curl_init(MPESA_BASE_URL . '/oauth/v1/generate?grant_type=client_credentials');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_USERPWD        => MPESA_CONSUMER_KEY . ':' . MPESA_CONSUMER_SECRET,
    ]);
    $response = curl_exec($ch);
    if ($response === false) {
        throw new RuntimeException('Could not reach M-Pesa (token): ' . curl_error($ch));
    }
    curl_close($ch);

    $data = json_decode($response, true);
    if (!isset($data['access_token'])) {
        throw new RuntimeException('M-Pesa token request failed: ' . $response);
    }
    return $data['access_token'];
}

/**
 * Initiate an STK push. Returns the decoded Daraja response
 * (contains CheckoutRequestID on success).
 */
function initiate_stk_push(string $msisdn, int $amountKes, string $accountRef, string $description): array
{
    $accessToken = get_mpesa_access_token();
    $timestamp = date('YmdHis');
    $password = base64_encode(MPESA_SHORTCODE . MPESA_PASSKEY . $timestamp);

    $payload = [
        'BusinessShortCode' => MPESA_SHORTCODE,
        'Password'          => $password,
        'Timestamp'         => $timestamp,
        'TransactionType'   => 'CustomerPayBillOnline',
        'Amount'            => $amountKes,
        'PartyA'            => $msisdn,
        'PartyB'            => MPESA_SHORTCODE,
        'PhoneNumber'       => $msisdn,
        'CallBackURL'       => MPESA_CALLBACK_URL,
        'AccountReference'  => $accountRef,
        'TransactionDesc'   => $description,
    ];

    $ch = curl_init(MPESA_BASE_URL . '/mpesa/stkpush/v1/processrequest');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($payload),
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . $accessToken,
            'Content-Type: application/json',
        ],
    ]);
    $response = curl_exec($ch);
    if ($response === false) {
        throw new RuntimeException('Could not reach M-Pesa (STK push): ' . curl_error($ch));
    }
    curl_close($ch);

    $data = json_decode($response, true);
    if (!is_array($data)) {
        throw new RuntimeException('Unexpected M-Pesa response: ' . $response);
    }
    return $data;
}

/**
 * Email the activation key to the customer.
 *
 * Uses PHP's mail(); swap the body of this function for PHPMailer + your
 * cPanel email account's SMTP credentials if you need reliable delivery
 * (mail() is fine for testing but easily lands in spam).
 */
function send_key_email(string $toEmail, string $firstName, string $activationKey): bool
{
    $subject = 'Your DevWorkstation activation key';
    $body =
        "Hi {$firstName},\n\n" .
        "Thanks for your payment — here is your activation key:\n\n" .
        "{$activationKey}\n\n" .
        "Enter this key in DevWorkstation to activate it.\n\n" .
        "— DevWorkstation";

    $headers = [
        'From: ' . MAIL_FROM_NAME . ' <' . MAIL_FROM_ADDRESS . '>',
        'Content-Type: text/plain; charset=UTF-8',
    ];

    return mail($toEmail, $subject, $body, implode("\r\n", $headers));
}
