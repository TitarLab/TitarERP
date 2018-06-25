<?php

if($data->action == "get"){
	$result = $db->select("employee","*",[
		"ORDER" => ["id" => "ASC"],
	]);
	$report->code = 200;
	$report->result = $result;
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "getCurrent"){
	$result = $db->select("employee","*",[
		"ORDER" => ["id" => "ASC"],
		"id" => $data->id
	]);
	$report->code = 200;
	$report->result = $result[0];
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "getNextId"){
	$result = $db->max("employee", "id");
	$report->code = 200;
	$report->result = $result+1;
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "add"){
	$db->insert("employee", [
		"id" => $data->employee->id,
		"firstname" => $data->employee->firstname,
		"lastname" => $data->employee->lastname,
		"phone" => $data->employee->phone,
		"email" => $data->employee->email
	]);
	$report->code = 200;
	$report->info = "Работник успешно добавлен!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "save"){
	$db->update("employee", [
		"firstname" => $data->employee->firstname,
		"lastname" => $data->employee->lastname,
		"phone" => $data->employee->phone,
		"email" => $data->employee->email,
	], [
		"id" => $data->employee->id
	]);
	$report->code = 200;
	$report->info = "Работник успешно обновлён!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "remove"){
	$db->delete("employee", [
		"id" => $data->id
	]);
	$report->info = "Работник успешно удалён!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "search"){
	$result = $db->select("employee","*",[
		"ORDER" => ["id" => "ASC"],
		"OR" =>[
			"firstname[~]" => $data->value,
			"lastname[~]" => $data->value
		]

	]);
	$result = json_decode(json_encode($result));
	$report->code = 200;
	$report->info = "Поиск завершён. Найдено ".count($result)." результатов";
	$report->result = $result;
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else{
		$report->code = "Некорректное действие";
		echo $report;
}

 ?>
