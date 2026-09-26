<?php
/**
 * Fill these in on the cPanel server. Do NOT commit real secrets to a public
 * repo — on cPanel, consider moving this file above the public_html web root
 * and require()'ing it from there instead.
 */

session_start();

// Download PHPMailer (https://github.com/PHPMailer/PHPMailer), unzip it,
// and place the resulting "PHPMailer-master" folder next to this file
// (i.e. cpanel-backend/PHPMailer-master/...).
require __DIR__ . '/PHPMailer-master/src/PHPMailer.php';
require __DIR__ . '/PHPMailer-master/src/SMTP.php';
require __DIR__ . '/PHPMailer-master/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ---- MySQL (create the DB + user in cPanel > MySQL Databases first) ----
define('DB_HOST', 'localhost');
define('DB_NAME', 'cpaneluser_keyactive');
define('DB_USER', 'cpaneluser_dbuser');
define('DB_PASS', 'CHANGE_ME');

// ---- Allowed frontend origin (your Vercel deployment) for CORS ----
// e.g. 'https://devworkstation.vercel.app' — use '*' only while testing.
define('ALLOWED_ORIGIN', 'https://your-site.vercel.app');

// ---- Pricing ----
define('PRICE_USD', 10);
define('USD_TO_KES_RATE', 130); // 10 USD -> 1300 KES at this rate

// ---- Safaricom Daraja (M-Pesa) ----
// 'sandbox' while testing, 'production' when live.
define('MPESA_ENV', 'sandbox');
define('MPESA_CONSUMER_KEY', 'CHANGE_ME');
define('MPESA_CONSUMER_SECRET', 'CHANGE_ME');
define('MPESA_SHORTCODE', '174379');       // Paybill/Till or your production shortcode
define('MPESA_PASSKEY', 'CHANGE_ME');       // Lipa Na M-Pesa Online passkey
// Must be a public HTTPS URL reachable by Safaricom, pointing at catch.php on this server.
define('MPESA_CALLBACK_URL', 'https://yourdomain.com/cpanel-backend/catch.php');

define('MPESA_BASE_URL', MPESA_ENV === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke');

// ---- Outgoing email (PHPMailer over SMTP, via a cPanel email account) ----
define('MAIL_SMTP_HOST', 'mail.yourdomain.com');
define('MAIL_SMTP_USERNAME', 'noreply@yourdomain.com'); // full cPanel email address
define('MAIL_SMTP_PASSWORD', 'CHANGE_ME');               // that mailbox's password
define('MAIL_SMTP_PORT', 465);                           // 465 for smtps, 587 for tls
define('MAIL_SMTP_SECURE', PHPMailer::ENCRYPTION_SMTPS);  // or ENCRYPTION_STARTTLS for port 587
define('MAIL_FROM_ADDRESS', 'noreply@yourdomain.com');
define('MAIL_FROM_NAME', 'DevWorkstation');
