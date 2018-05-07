<?php

if($data->action == "get"){
		$sql = "SELECT project.*,client.firstname, client.lastname from project left join client on client.id = project.client_id where 1 order by id ";
		$result = $db->request($sql);
		foreach ($result as $project) {
			$sql = "SELECT tag.id, tag.name, tag.color from project_tag left join tag on tag.id = project_tag.tag_id where project_id = '".$project->id."' order by id";
			$tags = $db->request($sql);
			$project->tagList = $tags;
			$sql = "SELECT task_status.list_name from project_task_category left join task_status on task_status.id = id_task_status where id_project = '".$project->id."'";
			$categories = $db->request($sql);
			$project->caregoryList = $categories;
		}
		$report->code = 200;
		$report->result = $result;
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "getCurrent"){
	$sql = "SELECT project.*,client.firstname, client.lastname from project left join client on client.id = project.client_id where project.id = '".$data->id."' order by id ";
	$result = $db->request($sql);
	foreach ($result as $project) {
		$sql = "SELECT tag.id, tag.name, tag.color from project_tag left join tag on tag.id = project_tag.tag_id where project_id = '".$project->id."' order by id";
		$tags = $db->request($sql);
		$project->tagList = $tags;
		$sql = "SELECT task_status.list_name from project_task_category left join task_status on task_status.id = id_task_status where id_project = '".$project->id."'";
		$categories = $db->request($sql);
		$project->caregoryList = $categories;
	}
	$report->code = 200;
	$report->result = $result[0];
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "getNextId"){
		$sql = "SELECT max(id) as 'maxId' from project where 1";
		$result = $db->request($sql);
		$report->code = 200;
		$report->result = $result[0]->maxId+1;
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "add"){
		// $sql = "INSERT INTO project (id, firstname, lastname, phone, email) values ('".$data->project->id."', '".$data->project->firstname."', '".$data->project->lastname."', '".$data->project->phone."', '".$data->project->email."')";
		// $db->request($sql, false);
		// $report->code = 200;
		// $report->info = "Работник успешно добавлен!";
		// echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "save"){
		// $sql = "UPDATE client set firstname = '".$data->project->firstname."', lastname = '".$data->project->lastname."', photo = '".$data->project->photo."', email = '".$data->project->email."', phone = '".$data->project->phone."' where id = '".$data->project->id."'";
		// $db->request($sql, false);
		// $report->code = 200;
		// $report->info = "Работник успешно обновлён!";
		// echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "remove"){
		// $sql = "DELETE from project where id = '".$data->id."'";
		// $db->request($sql, false);
		// $report->code = 200;
		// $report->result = $result[0]->maxId+1;
		// $report->info = "Работник успешно удалён!";
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "addCategory"){
		$id = -1;
		$sql = "SELECT id, list_name from task_status where list_name = '".$data->value."'";
		$result = $db->request($sql);
		if(empty($result) != 1){
			$id = $result[0]->id;
		}else if(empty($result) == 1) {
			$sql = "INSERT INTO task_status (name,list_name) values ('".$data->value."', '".$data->value."')";
			$db->request($sql,false);
			$sql = "SELECT id, list_name from task_status where list_name = '".$data->value."'";
			$result = $db->request($sql);
			$id = $result[0]->id;
		}
		$categoryId = 1;
		$sql = "SELECT max(id) as 'max' from project_task_category where 1";
		$result = $db->request($sql);
		$categoryId = $result[0]->max+1;
		$sql = "INSERT INTO project_task_category (id, id_project, id_task_status) values ('".$categoryId."', '".$data->id."', '".$id."')";
		$db->request($sql,false);
		$sql = "SELECT task_status.list_name from project_task_category left join task_status on task_status.id = id_task_status where project_task_category.id = '".$categoryId."'";
		$result = $db->request($sql);
		$report->code = 200;
		$report->result = $result[0];
		$report->info = "Категория успешно добавлена";
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else{
		$report->code = "Некорректное действие";
		echo $report;
}


 ?>
