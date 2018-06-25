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
			$memberList = $db->select("task_member",[
				"[>]employee" => ["employee_id" => "id"]
			],[
				"employee.id(id)",
				"employee.firstname",
				"employee.lastname"
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
	$id = $db->id();
	foreach($data->task->memberList as $employee){
		$db->insert("task_member", [
			"task_id" => $id,
			"employee_id" => $employee->id
		]);
	}
	$result = $db->get("task",[
		"[>]task_category" => ["category_id" => "id"],
		"[>]task_status" => ["status_id" => "id"],
		"[>]project" => ["project_id" => "id"]
	],[
		"task.name",
		"task.id",
		"task.category_id(categoryId)",
		"task_status.name(status)"
	],[
		"ORDER" => ["id" => "ASC"],
		"AND" => [
			"task.id" => $id
		]
	]);
	//echo json_encode($db->error());
	$result = json_decode(json_encode($result));
	$memberList = $db->select("task_member",[
		"[>]employee" => ["employee_id" => "id"]
	],[
		"employee.id(id)",
		"employee.firstname",
		"employee.lastname",
		"employee.photo"
	],[
		"ORDER" => ["employee.id" => "ASC"],
		"task_member.task_id" => $result->id
	]);
	$memberList = json_decode(json_encode($memberList));
	$result->memberList = array();
	foreach ($memberList as $employee) {
		$result->memberList += array($employee->id => $employee);
	}
	if(count($result->memberList) == 0){
		$result->memberList = (object)$result->memberList;
	}
	$report->result = $result;
	$report->code = 200;
	$report->info = "Задача успешно добавлена!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "getStatusList"){
	$result = $db->select("task_status","*",[
		"ORDER" => ["id" => "ASC"]
	]);
	$report->code = 200;
	$report->result = $result;
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "setStatus"){
	$db->update("task", [
		"status_id" => $data->value,
	], [
		"id" => $data->id
	]);
	$report->code = 200;
	$report->info = "Статус успешно обновлён!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "addMember"){
	$db->insert("task_member", [
		"task_id" => $data->id,
		"employee_id" => $data->value
	]);
	$member = $db->get("task_member",[
		"[>]employee" => ["employee_id" => "id"]
	],[
		"employee.id(id)",
		"employee.firstname",
		"employee.lastname",
		"employee.photo"
	],[
		"task_member.id" => $db->id()
	]);
	$report->result = $member;
	$report->code = 200;
	$report->info = "Работник успешно прикреплён!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "removeMember"){
	$db->delete("task_member", [
		"AND" => [
			"task_id" => $data->id,
			"employee_id" => $data->value
		]
	]);
	$report->code = 200;
	$report->info = "Работник успешно удалён!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "save"){

}else if($data->action == "remove"){
	$db->delete("task", [
		"id" => $data->id
	]);
	$report->code = 200;
	$report->info = "Задача успешно удалена!";
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
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
