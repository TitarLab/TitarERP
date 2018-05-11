<?php
//require_once("../api/report.php");
$postData = file_get_contents('php://input');
$data = json_decode($postData);
//$report = new report;

require '../libs/Medoo.php';
use Medoo\Medoo;

$db = new Medoo([
    'database_type' => 'mysql',
    'database_name' => 'rivaldi_titarcrm',
    'server' => 'rivaldi.mysql.tools',
    'username' => 'rivaldi_titarcrm',
    'password' => 'aqqdevje'
]);

$data = $db->select("client",[
  "firstname",
  "lastname"
],[
  "id" => 1
]);

echo json_encode($data);
