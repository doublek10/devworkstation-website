<?php
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/db.php';

send_cors_headers();

$id = $_GET['id'] ?? '';
if (!preg_match('/^[a-f0-9]{32}$/', $id)) {
    json_response(['status' => 'pending']);
}

$db = get_db();
$stmt = $db->prepare('SELECT status, activation_key FROM keyactive WHERE id = :id LIMIT 1');
$stmt->execute([':id' => $id]);
$record = $stmt->fetch();

if (!$record) {
    json_response(['status' => 'pending']);
}

if ($record['status'] === 'paid') {
    json_response(['status' => 'paid', 'key' => $record['activation_key']]);
}

json_response(['status' => 'pending']);
