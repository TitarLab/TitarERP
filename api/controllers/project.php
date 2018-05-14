<?php

if($data->action == "get"){
	$result = $db->select("project",[
		"[>]client" => ["client_id" => "id"]
	],[
		"project.name",
		"project.url",
		"project.id",
		"client.firstname",
		"client.lastname",
		"client.id(clientId)"
	],[
		"ORDER" => ["id" => "ASC"]
	]);
	$result = json_decode(json_encode($result));
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
		$project->tagList = json_decode(json_encode($project->tagList));

		$categories = $db->select("project_task_category",[
			"[>]task_category" => ["id_task_category" => "id"]
		],[
			"task_category.name",
			"task_category.id"
		],[
			"project_task_category.id_project" => $project->id
		]);
		$categories = json_decode(json_encode($categories));
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
			$taskTemp = json_decode(json_encode($taskTemp));
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
	$result = json_decode(json_encode($result));
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
		$project->tagList = json_decode(json_encode($project->tagList));

		$categories = $db->select("project_task_category",[
			"[>]task_category" => ["id_task_category" => "id"]
		],[
			"task_category.name",
			"task_category.id"
		],[
			"project_task_category.id_project" => $project->id
		]);
		$categories = json_decode(json_encode($categories));
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
			$taskTemp = json_decode(json_encode($taskTemp));
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
		$result = $db->select("task_category",[
			"id",
			"name",
		],[
			"ORDER" => ["id" => "ASC"],
			"name" => $data->value
		]);
		$result = json_decode(json_encode($result));
		if(empty($result) != 1){
			$id = $result[0]->id;
		}else if(empty($result) == 1) {
			$db->insert("task_category", [
				"name" => $data->value,
			]);
			$result = $db->select("task_category",[
				"id",
				"name",
			],[
				"ORDER" => ["id" => "ASC"],
				"name" => $data->value
			]);
			$result = json_decode(json_encode($result));
			$id = $result[0]->id;
		}
		$categoryId = 1;
		$result = $db->max("project_task_category","id");
		$categoryId = $result+1;
		$db->insert("project_task_category", [
			"id" => $categoryId,
			"id_project" => $data->id,
			"id_task_category" => $id,
		]);
		//echo json_encode($db->error());
		$result = $db->select("project_task_category",[
			"[>]task_category" => ["id_task_category" => "id"]
		],[
			"task_category.name",
		],[
			"project_task_category.id" => $categoryId
		]);
		//echo json_encode($db->error());
		$result = json_decode(json_encode($result));
		$report->code = 200;
		$report->result = $result[0];
		$report->info = "Категория успешно добавлена";
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else{
		$report->code = "Некорректное действие";
		echo $report;
}


 ?>
