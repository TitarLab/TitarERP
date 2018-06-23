<?php
if($data->action == "login"){
	$result = $db->select("user",[
		"[>]employee" => ["employee_id" => "id"]
	],[
		"user.password",
		"user.id",
		"employee.firstname",
		"employee.lastname",
		"employee.email"
	],[
		"user.login" => $data->login
	]);
	$result = json_decode(json_encode($result));
	if(password_verify($data->password,$result[0]->password)){
		$report->code = 200;
		$report->result = $result[0];
	}else{
		$report->code = "FAIL";
	}
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else{
	$report->code = "Некорректное действие";
	echo $report;
}
