<?php

if($data->action == "get"){
		$sql = "SELECT id, firstname, lastname, status, last_contact as 'lastContact', contacts, note, photo,email,phone from client where 1 order by id ";
		$result = $db->request($sql);
		$report->code = 200;
		$report->result = $result;
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "getCurrent"){
		$sql = "SELECT id, firstname, lastname, status, last_contact as 'lastContact', contacts, note, photo,email,phone from client where id = '".$data->id."' order by id ";
		$result = $db->request($sql);
		$client = $result[0];
		$sql = "SELECT id, name from project where client_id = '".$data->id."' order by id ";
		$client->projects = $db->request($sql);
		$report->code = 200;
		$report->result = $client;
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "getNextId"){
		$sql = "SELECT max(id) as 'maxId' from client where 1";
		$result = $db->request($sql);
		$report->code = 200;
		$report->result = $result[0]->maxId+1;
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "add"){


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




	$db->insert("client", [
		"id" => $data->client->id,
		"firstname" => $data->client->firstname,
		"lastname" => $data->client->lastname,
		"status" => $data->client->status,
		"note" => $data->client->note,
		"last_contact" => $data->client->lastContact,
		"contacts[JSON]" => $data->client->contacts
	]);
	$report->code = 200;
	$report->info = "Клиент успешно добавлен!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "save"){
	$db->update("account", [
		"firstname" => $data->client->firstname,
		"lastname" => $data->client->lastname,
		"status" => $data->client->status,
		"note" => $data->client->note,
		"last_contact" => $data->client->lastContact,
		"contacts[JSON]" => $data->client->contacts,
		"photo" => $data->client->photo,
		"email" => $data->client->email,
		"phone" => $data->client->phone
	], [
		"id" => $data->client->id
	]);
	$report->code = 200;
	$report->info = "Клиент успешно обновлён!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "remove"){
	$db->delete("client", [
		"id" => $data->id
	]);
	$report->code = 200;
	$report->info = "Клиент успешно удалён!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else{
		$report->code = "Некорректное действие";
		echo $report;
}
