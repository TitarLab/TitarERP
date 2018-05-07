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
		$sql = "INSERT INTO client (id, firstname, lastname, status, note, last_contact, contacts) values ('".$data->client->id."', '".$data->client->firstname."', '".$data->client->lastname."', '".$data->client->status."', '".$data->client->note."', '".$data->client->lastContact."', '".json_encode($data->client->contacts,JSON_UNESCAPED_UNICODE)."')";
		$db->request($sql, false);
		$report->code = 200;
		$report->info = "Клиент успешно добавлен!";
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "save"){
		$sql = "UPDATE client set firstname = '".$data->client->firstname."', lastname = '".$data->client->lastname."', status = '".$data->client->status."', note = '".$data->client->note."', last_contact = '".$data->client->lastContact."', contacts = '".json_encode($data->client->client->contacts,JSON_UNESCAPED_UNICODE)."', photo = '".$data->client->photo."', email = '".$data->client->email."', phone = '".$data->client->phone."' where id = '".$data->client->id."'";
		$db->request($sql, false);
		$report->code = 200;
		$report->info = "Клиент успешно обновлён!";
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "remove"){
		$sql = "DELETE from client where id = '".$data->id."'";
		$db->request($sql, false);
		$report->code = 200;
		$report->result = $result[0]->maxId+1;
		$report->info = "Клиент успешно удалён!";
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else{
		$report->code = "Некорректное действие";
		echo $report;
}
