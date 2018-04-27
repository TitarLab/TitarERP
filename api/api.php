<?php
$postData = file_get_contents('php://input');
$data = json_decode($postData);
$report = new report;

require("db.php");
$db = new DB;
$db->createConnection();

if($data->model == "client"){
    if($data->action == "get"){
        $sql = "Select id, name, status, DATE_FORMAT(last_contact, '%d.%m.%Y') as 'lastContact', contacts, note from client where 1";
        $result = $db->request($sql);
        $report->code = 200;
        $report->result = $result;
        echo json_encode($report, JSON_UNESCAPED_UNICODE);
    }else{
        $report->code = "Некорректное действие";
        echo $report;
    }
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