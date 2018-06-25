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
			"project_tag.id(projectTagId)",
			"tag.id",
			"tag.name",
			"tag.color",
		],[
			"ORDER" => ["project_tag.id" => "ASC"],
			"project_id" => $project->id
		]);
		$tempTagList = json_decode(json_encode($project->tagList));
		$project->tagList = array();
		foreach ($tempTagList as $tag) {
			$project->tagList += array($tag->projectTagId => $tag);
		}
		if(count($project->tagList) == 0){
			$project->tagList = (object)$project->tagList;
		}

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
				"[>]project" => ["project_id" => "id"]
			],[
				"task.name",
				"task.id",
				"task_status.name(status)"
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
				$memberList = $db->select("task_member",[
					"[>]employee" => ["employee_id" => "id"]
				],[
					"employee.id(id)",
					"employee.firstname",
					"employee.lastname",
					"employee.photo"
				],[
					"ORDER" => ["employee.id" => "ASC"],
					"task_member.task_id" => $task->id
				]);
				$memberList = json_decode(json_encode($memberList));
				$task->memberList = array();
				foreach ($memberList as $employee) {
					$task->memberList += array($employee->id => $employee);
				}
				if(count($task->memberList) == 0){
					$task->memberList = (object)$task->memberList;
				}

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
		"client.id(clientId)",
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
			"project_tag.id(projectTagId)",
			"tag.id",
			"tag.name",
			"tag.color",
		],[
			"ORDER" => ["project_tag.id" => "ASC"],
			"project_id" => $project->id
		]);
		$tempTagList = json_decode(json_encode($project->tagList));
		$project->tagList = array();
		foreach ($tempTagList as $tag) {
			$project->tagList += array($tag->projectTagId => $tag);
		}
		if(count($project->tagList) == 0){
			$project->tagList = (object)$project->tagList;
		}

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
				"task.name",
				"task.id",
				"task_status.name(status)"
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
				$memberList = $db->select("task_member",[
					"[>]employee" => ["employee_id" => "id"]
				],[
					"employee.id(id)",
					"employee.firstname",
					"employee.lastname",
					"employee.photo"
				],[
					"ORDER" => ["employee.id" => "ASC"],
					"task_member.task_id" => $task->id
				]);
				$memberList = json_decode(json_encode($memberList));
				$task->memberList = array();
				foreach ($memberList as $employee) {
					$task->memberList += array($employee->id => $employee);
				}
				if(count($task->memberList) == 0){
					$task->memberList = (object)$task->memberList;
				}
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
	$result = $db->max("project", "id");
	$report->code = 200;
	$report->result = $result+1;
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "add"){
	$db->insert("project", [
		"id" => $data->project->id,
		"name" => $data->project->name,
		"url" => $data->project->url,
		"client_id" => $data->project->clientId,
	]);
	if($data->project->tagList != null && count($data->project->tagList) > 0){
		foreach($data->project->tagList as $tag){
			$db->insert("project_tag", [
				"tag_id" => $tag->id,
				"project_id" => $data->project->id
			]);
		}
	}
	$report->code = 200;
	$report->info = "Проект успешно добавлен!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "save"){
	$db->update("project", [
		"name" => $data->project->name,
		"url" => $data->project->url,
		"client_id" => $data->project->clientId
	], [
		"id" => $data->project->id
	]);
	$report->code = 200;
	$report->info = "Проект успешно обновлён!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "removeTag"){
	$db->delete("project_tag", [
		"id" => $data->id
	]);
	$report->code = 200;
	$report->info = "Тег успешно удалён!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "remove"){
	$db->delete("project", [
		"id" => $data->id
	]);
	$db->delete("project_tag", [
		"project_id" => $data->id
	]);
	$report->code = 200;
	$report->info = "проект успешно удалён!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "removeCategory"){
	$db->delete("project_task_category", [
		"AND" => [
			"id_task_category" => $data->id,
			"id_project" => $data->projectId
		]
	]);
	//echo json_encode($db->error());
	$db->delete("task", [
		"AND" => [
			"category_id" => $data->id,
			"project_id" => $data->projectId
		]
	]);
	$report->code = 200;
	$report->info = "Категория успешно удалена!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
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
}else if($data->action == "addTag"){
		$id = -1;
		$result = $db->select("tag",[
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
			$db->insert("tag", [
				"name" => $data->value,
			]);
			$result = $db->select("tag",[
				"id",
				"name",
			],[
				"ORDER" => ["id" => "ASC"],
				"name" => $data->value
			]);
			$result = json_decode(json_encode($result));
			$result = $result[0];
			$id = $result->id;
		}
		if($data->addToProject == true){
			$tagId = 1;
			$result = $db->max("project_tag","id");
			$tagId = $result+1;
			$db->insert("project_tag", [
				"id" => $tagId,
				"project_id" => $data->id,
				"tag_id" => $id,
			]);
			//echo json_encode($db->error());
			$result = $db->select("project_tag",[
				"[>]tag" => ["tag_id" => "id"],
			],[
				"project_tag.id(projectTagId)",
				"tag.name",
				"tag.id(id)",
			],[
				"project_tag.id" => $tagId
			]);
		}

		//echo json_encode($db->error());
		$result = json_decode(json_encode($result));
		$report->code = 200;
		$report->result = $result[0];
		$report->info = "Тег успешно добавлен";
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "createTag"){
		$id = -1;
		$result = $db->select("tag",[
			"id",
			"name",
		],[
			"ORDER" => ["id" => "ASC"],
			"name" => $data->value
		]);
		$result = json_decode(json_encode($result));
		if(empty($result) != 1){
			$id = $result[0]->id;
			$report->info = "Тег существовал";
		}else if(empty($result) == 1) {
			$db->insert("tag", [
				"name" => $data->value,
			]);
			$report->info = "Тег успешно создан";
		}
		$report->code = 200;
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "searchTag"){
	$result = $db->select("tag",[
		"id",
		"name",
		"color",
	],[
		"ORDER" => ["id" => "ASC"],
		"name[~]" => $data->value
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
