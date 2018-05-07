<?php

if($data->action == "get"){
		$sql = "SELECT * from employee where 1 order by id ";
		$result = $db->request($sql);
		$report->code = 200;
		$report->result = $result;
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "getCurrent"){
		$sql = "SELECT * from employee where id = '".$data->id."' order by id ";
		$result = $db->request($sql);
		$employee = $result[0];
		//$sql = "SELECT id, name from project where client_id = '".$data->id."' order by id ";
		//$client->projects = $db->request($sql);
		$report->code = 200;
		$report->result = $employee;
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "getNextId"){
		$sql = "SELECT max(id) as 'maxId' from employee where 1";
		$result = $db->request($sql);
		$report->code = 200;
		$report->result = $result[0]->maxId+1;
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "add"){
		$sql = "INSERT INTO employee (id, firstname, lastname, phone, email) values ('".$data->employee->id."', '".$data->employee->firstname."', '".$data->employee->lastname."', '".$data->employee->phone."', '".$data->employee->email."')";
		$db->request($sql, false);
		$report->code = 200;
		$report->info = "Работник успешно добавлен!";
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "save"){
		$sql = "UPDATE client set firstname = '".$data->employee->firstname."', lastname = '".$data->employee->lastname."', photo = '".$data->employee->photo."', email = '".$data->employee->email."', phone = '".$data->employee->phone."' where id = '".$data->employee->id."'";
		$db->request($sql, false);
		$report->code = 200;
		$report->info = "Работник успешно обновлён!";
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "remove"){
		$sql = "DELETE from employee where id = '".$data->id."'";
		$db->request($sql, false);
		$report->code = 200;
		$report->result = $result[0]->maxId+1;
		$report->info = "Работник успешно удалён!";
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else{
		$report->code = "Некорректное действие";
		echo $report;
}

 ?>
