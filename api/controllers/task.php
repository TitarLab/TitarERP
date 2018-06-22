<?php

if($data->action == "get"){
	$tasks = array();
	$result = $db->select("task_status","*",[
		"ORDER" => ["id" => "ASC"]
	]);
	$result = json_decode(json_encode($result));
	foreach($result as $category){
		$tasks[] = $category;
		$taskTemp = $db->select("task",[
			"[>]task_status" => ["status_id" => "id"],
			"[>]project" => ["project_id" => "id"],
			"[>]task_category" => ["category_id" => "id"]
		],[
			"task.id",
			"task.project_id",
			"task.name",
			"task.status_id",
			"task.category_id",
			"task.deadline",
			"task.priority",
			"task_status.name(status)",
			"task_category.name(category)",
			"project.name(project)",
		],[
			"ORDER" => ["id" => "ASC"],
			"status_id" => $category->id
		]);
		$taskTemp = json_decode(json_encode($taskTemp));
		$tasks[count($tasks)-1]->list = array();
		foreach ($taskTemp as $task) {
			$tasks[count($tasks)-1]->list += array($task->id => $task);
		}
		if(count($tasks[count($tasks)-1]->list) == 0){
			$tasks[count($tasks)-1]->list = (object)$tasks[count($tasks)-1]->list;
		}
	}
	$report->code = 200;
	$report->result = $tasks;
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
	}else if($data->action == "getCurrent"){
	$result = $db->select("task",[
		"[>]task_status" => ["status_id" => "id"],
		"[>]project" => ["project_id" => "id"],
		"[>]task_category" => ["category_id" => "id"]
	],[
		"task.id",
		"task.project_id",
		"task.name",
		"task.status_id",
		"task.category_id",
		"task.deadline",
		"task.priority",
		"task_status.name(status)",
		"task_category.name(category)",
		"project.name(project)",
	],[
		"ORDER" => ["id" => "ASC"],
		"task.id" => $data->id
	]);
	$result = json_decode(json_encode($result));
	$project = $result[0];
	$report->code = 200;
	$report->result = $project;
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "getNextId"){
	$result = max("task", [
		"id(maxId)"
	]);
	$report->code = 200;
	$report->result = $result[0]->maxId+1;
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "add"){
	if($data->task->priority == null){
		$data->task->priority = "Обычный";
	}
	if($data->task->deadline == null){
		$data->task->deadline = "";
	}
	$db->insert("task", [
		"name" => $data->task->name,
		"project_id" => $data->project->id,
		"status_id" => $data->task->statusId,
		"category_id" => $data->task->categoryId,
		"priority" => $data->task->priority,
		"deadline" => $data->task->deadline
	]);
	$report->result = $db->get("task",[
		"[>]task_category" => ["category_id" => "id"],
		"[>]task_status" => ["status_id" => "id"],
		"[>]project" => ["project_id" => "id"],
	],[
		"task.name",
		"task.id",
		"task.category_id(categoryId)",
		"task_status.name(status)"
	],[
		"ORDER" => ["id" => "ASC"],
		"AND" => [
			"task.id" => $db->id()
		]
	]);
	$report->code = 200;
	$report->info = "Задача успешно добавлена!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "save"){

}else if($data->action == "remove"){

}else if($data->action == "searchStatus"){
	$result = $db->select("task_status",[
		"id",
		"list_name(name)",
	],[
		"ORDER" => ["id" => "ASC"],
		"list_name[~]" => $data->value
	]);
	$result = json_decode(json_encode($result));
	$report->code = 200;
	$report->info = "Поиск завершён. Найдено ".count($result)." результатов";
	$report->result = $result;
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "searchCategory"){
	$result = $db->select("task_category",[
		"id",
		"name",
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
