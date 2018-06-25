<?php
$postData = file_get_contents('php://input');
$data = json_decode($postData);
$report = new report;

require '../libs/Medoo.php';
use Medoo\Medoo;


$db = new Medoo([
    'database_type' => 'mysql',
    'database_name' => 'rivaldi_titarcrm',
    'server' => 'rivaldi.mysql.tools',
    'username' => 'rivaldi_titarcrm',
    'password' => 'aqqdevje',
		'charset' => 'utf8'

]);

if($data->model == "client"){
    require_once("controllers/client.php");
}else if($data->model == "employee"){
    require_once("controllers/employee.php");
}else if($data->model == "project"){
	require_once("controllers/project.php");
}else if($data->model == "task"){
	require_once("controllers/task.php");
}else if($data->model == "tag"){
	require_once("controllers/tag.php");
}else if($data->model == "auth"){
	require_once("controllers/auth.php");
}else{
    $report->code = "ERROR";
    $report->info = "Некорректная модель";
    echo $report;
}


class report{
    public $code = 200;
    public $result;
    public $info;
}
