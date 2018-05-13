<?php

if($data->action == "get"){
	$result = $db->select("project",[
		"[>]client" => ["client_id" => "id"]
	],[
		"project.name",
		"project.url",
		"project.id",
		"project.client_id",
		"client.firstname",
		"client.lastname",
	],[
		"ORDER" => ["project.id" => "ASC"],
	]);
	if($db->error()[0] != "00000"){
		echo json_encode($db->error());
	}
	for($i = 0; $i < count($result); $i++){
		$result[$i] = (object)$result[$i];
		$result[$i]->tagList = $db->select("project_tag",[
			"[>]tag" => ["tag_id" => "id"]
		],[
			"tag.id",
			"tag.name",
			"tag.color",
		],[
			"ORDER" => ["id" => "ASC"],
			"project_id" => $result[$i]->id
		]);

		$categories = $db->select("project_task_category",[
			"[>]task_category" => ["id_task_category" => "id"]
		],[
			"task_category.name",
			"task_category.id"
		],[
			"project_task_category.id_project" => $project->id
		]);
		for($k = 0; $k < count($categories);$k++){
			$categories[$k] = (object)$category[$k];
			$taskTemp = $db->select("task",[
				"[>]task_category" => ["category_id" => "id"],
				"[>]task_status" => ["status_id" => "id"],
				"[>]project" => ["project_id" => "id"],
			],[
				"task_category.name",
				"task_category.id"
			],[
				"ORDER" => ["id" => "ASC"],
				"AND" => [
					"project_id" => $result[$i]->id,
					"category_id" => $categories[$k]->id,
				]
			]);
			$categories[$k]->list = array();
			for($j = 0; $j < count($taskTemp); $j++){
				$taskTemp[$j] = (object)$taskTemp[$j];
				$categories[$k]->list += array($taskTemp[$j]->id => $taskTemp[$j]);
			}
			if(count($categories[$k]->list) == 0){
				$categories[$k]->list = (object)$category->list;
			}
		}

		$result[$i]->categoryList = $categories;
		//echo json_encode($project->tag_list);
	}
	$report->code = 200;
	$report->result = $result;
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "getCurrent"){
	$result = $db->select("project",[
		"[>]client" => ["client_id" => "id"]
	],[
		"project.name",
		"project.url",
		"project.id",
		"project.client_id",
		"client.firstname",
		"client.lastname",
	],[
		"ORDER" => ["project.id" => "ASC"],
		"project.id" => $data->id
	]);
	foreach ($result as $project) {
		$project->tagList = $db->select("project_tag",[
			"[>]tag" => ["tag_id" => "id"]
		],[
			"tag.id",
			"tag.name",
			"tag.color",
		],[
			"ORDER" => ["project_tag.id" => "ASC"],
			"project_id" => $project->id
		]);

		$categories = $db->select("project_task_category",[
			"[>]task_category" => ["id_task_category" => "id"]
		],[
			"task_category.name",
			"task_category.id"
		],[
			"project_task_category.id_project" => $project->id
		]);
		foreach ($categories as $category) {
			$taskTemp = $db->select("task",[
				"[>]task_category" => ["category_id" => "id"],
				"[>]task_status" => ["status_id" => "id"],
				"[>]project" => ["project_id" => "id"],
			],[
				"task_category.name",
				"task_category.id"
			],[
				"ORDER" => ["id" => "ASC"],
				"AND" => [
					"project_id" => $project->id,
					"category_id" => $category->id,
				]
			]);
			$category->list = array();
			foreach ($taskTemp as $task) {
				$category->list += array($task->id => $task);
			}
			if(count($category->list) == 0){
				$category->list = (object)$category->list;
			}
		}
		$project->categoryList = $categories;
	}
	$report->code = 200;
	$report->result = $result[0];
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "getNextId"){
	$result = max("project", [
		"id(maxId)"
	]);
	$report->code = 200;
	$report->result = $result[0]->maxId+1;
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "add"){

}else if($data->action == "save"){

}else if($data->action == "remove"){

}else if($data->action == "addCategory"){
		$id = -1;
		$sql = "SELECT id, name from task_category where name = '".$data->value."'";
		$result = $db->request($sql);
		if(empty($result) != 1){
			$id = $result[0]->id;
		}else if(empty($result) == 1) {
			$sql = "INSERT INTO task_category (name) values ('".$data->value."')";
			$db->request($sql,false);
			$sql = "SELECT id, name from task_category where name = '".$data->value."'";
			$result = $db->request($sql);
			$id = $result[0]->id;
		}
		$categoryId = 1;
		$sql = "SELECT max(id) as 'max' from project_task_category where 1";
		$result = $db->request($sql);
		$categoryId = $result[0]->max+1;
		$sql = "INSERT INTO project_task_category (id, id_project, id_task_category) values ('".$categoryId."', '".$data->id."', '".$id."')";
		$db->request($sql,false);
		$sql = "SELECT task_category.name from project_task_category left join task_category on task_category.id = id_task_category where project_task_category.id = '".$categoryId."'";
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
