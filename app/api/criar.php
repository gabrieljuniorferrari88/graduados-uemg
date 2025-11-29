<?php
header("Content-Type: application/json");
require 'conectar.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(['erro' => 'JSON inválido']);
    exit;
}

$campos = [
    'nome', 'curso', 'inicio', 'conclusao',
    'foto', 'softSkills', 'techSkills', 'trabalhoAtual'
];

foreach ($campos as $campo) {
    if (!isset($data[$campo])) {
        echo json_encode(['erro' => "Campo obrigatório ausente: $campo"]);
        exit;
    }
}

$sql = "INSERT INTO graduados 
(nome, curso, inicio, conclusao, foto, softskills, techskills, trabalhoatual)
VALUES (:nome, :curso, :inicio, :conclusao, :foto, :softskills, :techskills, :trabalhoatual)";

$stmt = $pdo->prepare($sql);

$stmt->execute([
    ':nome' => $data['nome'],
    ':curso' => $data['curso'],
    ':inicio' => $data['inicio'],
    ':conclusao' => $data['conclusao'],
    ':foto' => $data['foto'],
    ':softskills' => implode(',', $data['softSkills']),
    ':techskills' => implode(',', $data['techSkills']),
    ':trabalhoatual' => $data['trabalhoAtual']
]);

echo json_encode(['sucesso' => true]);
