<?php
header("Content-Type: application/json");
require 'conectar.php';

$stmt = $pdo->query("SELECT * FROM graduados ORDER BY conclusao DESC");
$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($resultado as &$item) {
    $item['softskills'] = explode(',', $item['softskills']);
    $item['techskills'] = explode(',', $item['techskills']);
}

echo json_encode($resultado);
