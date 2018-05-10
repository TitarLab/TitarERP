<?php

if($data->action == "get"){
	$tasks = array();
	$sql = "SELECT * from task_status where 1";
	$result = $db->request($sql);
	foreach($result as $category){
		$tasks[] = $category;
		$sql = "SELECT task.*, task_status.name as 'status', task_category.name as 'category', project.name as 'project' from task left join task_status on task_status.id = task.status_id left join project on project.id = task.project_id left join task_category on task_category.id = task.category_id where status_id = '".$category->id."' order by id";
		$taskTemp = $db->request($sql);
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
	}else if($data->action == "getStatus"){
		$tasks = array();
		$sql = "SELECT * from task_status where 1";
		$result = $db->request($sql);
		foreach($result as $category){
			$tasks[] = $category;
			$sql = "task.*, task_status.name as 'status', project.name as 'project' from task left join task_status on task_status.id = task.status_id left join project on project.id = task.project_id where status_id = '".$category->id."' order by id";
			$taskTemp = $db->request($sql);
			$tasks[count($tasks)]->list = $taskTemp;
		}
		$report->code = 200;
		$report->result = $tasks;
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "getCurrent"){
		$sql = "SELECT task.*, task_status.name as 'status', task_category.name as 'category', project.name as 'project' from task left join task_status on task_status.id = task.status_id left join project on project.id = task.project_id left join task_category on task_category.id = task.category_id  where id = '".$data->id."' order by id ";
		$result = $db->request($sql);
		$project = $result[0];
		//$sql = "SELECT id, name from project where client_id = '".$data->id."' order by id ";
		//$client->projects = $db->request($sql);
		$report->code = 200;
		$report->result = $project;
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "getNextId"){
		$sql = "SELECT max(id) as 'maxId' from task where 1";
		$result = $db->request($sql);
		$report->code = 200;
		$report->result = $result[0]->maxId+1;
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "add"){
		$sql = "INSERT INTO task (name, project_id, employee_id, status_id, category_id, priority, deadline) values ('".$data->task->name."', '".$data->project->id."', '".$data->task->employeeId."', '".$data->task->statusId."', '".$data->task->categoryId."', '".$data->task->priority."', '".$data->task->deadline."')";
		$db->request($sql, false);
		$report->code = 200;
		$report->info = "Задача успешно добавлена!";
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
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
		// echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "searchStatus"){
	$sql = "SELECT id, list_name as 'name' from task_status where list_name like '%".$data->value."%'";
	$result = $db->request($sql);
	$report->code = 200;
	$report->info = "Поиск завершён. Найдено ".count($result)." результатов";
	$report->result = $result;
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else if($data->action == "searchCategory"){
	$sql = "SELECT id, name from task_category where name like '%".$data->value."%'";
	$result = $db->request($sql);
	$report->code = 200;
	$report->info = "Поиск завершён. Найдено ".count($result)." результатов";
	$report->result = $result;
	echo json_encode($report, JSON_UNESCAPED_UNICODE);
}else{
		$report->code = "Некорректное действие";
		echo $report;
}

 ?>
