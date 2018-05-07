<?php
$postData = file_get_contents('php://input');
$data = json_decode($postData);
$report = new report;

require("db.php");
$db = new DB;
$db->createConnection();

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
}else{
    $report->code = "ERROR";
    $report->info = "Некорректная модель";
    echo $report;
}

$db->closeConnection();

class report{
    public $code = 200;
    public $result;
    public $info;
}
