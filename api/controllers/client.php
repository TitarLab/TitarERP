<?php

if($data->action == "get"){
	$result = $db->select("client",[
		"id",
		"firstname",
		"lastname",
		"status",
		"last_contact(lastContact)",
		"contacts",
		"note",
		"photo",
		"email",
		"phone",
	],[
		"ORDER" => ["id" => "ASC"],
	]);
	$result = json_decode(json_encode($result));
	foreach($result as $client){
		$client->projectList = $db->select("project",[
			"name",
			"id"
		],[
			"ORDER" => ["id" => "ASC"],
			"client_id" => $client->id
		]);
	}
	$report->code = 200;
	$report->result = $result;
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "getCurrent"){
	$result = $db->select("client",[
		"id",
		"firstname",
		"lastname",
		"status",
		"last_contact(lastContact)",
		"contacts",
		"note",
		"photo",
		"email",
		"phone",
	],[
		"ORDER" => ["id" => "ASC"],
		"id" => $data->id
	]);
	$result = json_decode(json_encode($result));
	$client = $result[0];
	$client->projectList = $db->select("project",[
		"id",
		"name",
	],[
		"ORDER" => ["id" => "ASC"],
		"client_id" => $data->id
	]);
	$commentList = $db->select("client_comment",[
		"[>]user" => ["user_id" => "id"],
		"[>]employee" => ["user.employee_id" => "id"]
	],[
		"client_comment.id(id)",
		"employee.firstname(firstname)",
		"employee.lastname(lastname)",
		"text(text)",
		"date_created(dateCreated)"
	],[
		"ORDER" => ["client_comment.id" => "ASC"],
		"client_id" => $client->id
	]);
	$commentList =  json_decode(json_encode($commentList));
	$client->commentList = array();
	foreach ($commentList as $comment) {
		$client->commentList += array($comment->id => $comment);
	}
	if(count($client->commentList) == 0){
		$client->commentList = (object)$client->commentList;
	}
	$report->code = 200;
	$report->result = $client;
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "getNextId"){
	$result = $db->max("client", "id");
	$report->code = 200;
	$report->result = $result+1;
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "add"){
	$db->insert("client", [
		"id" => $data->client->id,
		"firstname" => $data->client->firstname,
		"lastname" => $data->client->lastname,
		"status" => $data->client->status,
		"note" => $data->client->note,
		"last_contact" => $data->client->lastContact,
		"phone" => $data->client->phone,
		"email" => $data->client->email,
		//"contacts[JSON]" => $data->client->contacts
	]);
	//echo json_encode($db->error());
	$report->code = 200;
	$report->info = "Клиент успешно добавлен!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "save"){
	$db->update("client", [
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
}else if($data->action == "addComment"){
	$db->insert("client_comment",[
		"text" => $data->comment->text,
		"date_created" => date("Y-m-d H:i:s"),
		"user_id" => $data->comment->userId,
		"client_id" => $data->id
	]);
	$id = $db->id();
	$result = $db->select("client_comment",[
		"[>]user" => ["user_id" => "id"],
		"[>]employee" => ["user.employee_id" => "id"]
	],[
		"employee.firstname(firstname)",
		"employee.lastname(lastname)",
		"text",
		"date_created(dateCreated)"
	],[
		"ORDER" => ["client_comment.id" => "ASC"],
		"client_comment.id" => $id
	]);
	$report->result = $result[0];
	$report->code = 200;
	$report->info = "Комментарий успешно добавлен!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "removeComment"){
	$db->delete("client_comment", [
		"id" => $data->id
	]);
	$report->code = 200;
	$report->info = "Комментарий успешно удалён!";
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
