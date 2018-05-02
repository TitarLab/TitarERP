<?php
$postData = file_get_contents('php://input');
$data = json_decode($postData);
$report = new report;

require("db.php");
$db = new DB;
$db->createConnection();

if($data->model == "client"){
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
}else if($data->model == "employee"){
    if($data->action == "get"){
        $sql = "SELECT * from employee where 1 order by id ";
        $result = $db->request($sql);
        $report->code = 200;
        $report->result = $result;
        echo json_encode($report, JSON_UNESCAPED_UNICODE);
    }else if($data->action == "getCurrent"){
        $sql = "SELECT * from employee where id = '".$data->id."' order by id ";
        $result = $db->request($sql);
				$employee = $result[0];
				//$sql = "SELECT id, name from project where client_id = '".$data->id."' order by id ";
				//$client->projects = $db->request($sql);
        $report->code = 200;
        $report->result = $employee;
        echo json_encode($report, JSON_UNESCAPED_UNICODE);
    }else if($data->action == "getNextId"){
        $sql = "SELECT max(id) as 'maxId' from employee where 1";
        $result = $db->request($sql);
        $report->code = 200;
        $report->result = $result[0]->maxId+1;
        echo json_encode($report, JSON_UNESCAPED_UNICODE);
    }else if($data->action == "add"){
        $sql = "INSERT INTO employee (id, firstname, lastname, phone, email) values ('".$data->employee->id."', '".$data->employee->firstname."', '".$data->employee->lastname."', '".$data->employee->phone."', '".$data->employee->email."')";
        $db->request($sql, false);
        $report->code = 200;
        $report->info = "Работник успешно добавлен!";
        echo json_encode($report, JSON_UNESCAPED_UNICODE);
    }else if($data->action == "save"){
        $sql = "UPDATE client set firstname = '".$data->employee->firstname."', lastname = '".$data->employee->lastname."', photo = '".$data->employee->photo."', email = '".$data->employee->email."', phone = '".$data->employee->phone."' where id = '".$data->employee->id."'";
        $db->request($sql, false);
        $report->code = 200;
        $report->info = "Работник успешно обновлён!";
        echo json_encode($report, JSON_UNESCAPED_UNICODE);
    }else if($data->action == "remove"){
        $sql = "DELETE from employee where id = '".$data->id."'";
        $db->request($sql, false);
        $report->code = 200;
        $report->result = $result[0]->maxId+1;
				$report->info = "Работник успешно удалён!";
        echo json_encode($report, JSON_UNESCAPED_UNICODE);
    }else{
        $report->code = "Некорректное действие";
        echo $report;
    }
}else if($data->model == "project"){
	if($data->action == "get"){
			$sql = "SELECT project.*,client.firstname, client.lastname from project left join client on client.id = project.client_id where 1 order by id ";
			$result = $db->request($sql);
			$report->code = 200;
			$report->result = $result;
			echo json_encode($report, JSON_UNESCAPED_UNICODE);
	}else if($data->action == "getCurrent"){
			$sql = "SELECT * from project where id = '".$data->id."' order by id ";
			$result = $db->request($sql);
			$project = $result[0];
			//$sql = "SELECT id, name from project where client_id = '".$data->id."' order by id ";
			//$client->projects = $db->request($sql);
			$report->code = 200;
			$report->result = $project;
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
	}else{
			$report->code = "Некорректное действие";
			echo $report;
	}
}else if($data->model == "task"){
	if($data->action == "get"){
		$tasks = array();
		$sql = "SELECT * from task_status where 1";
		$result = $db->request($sql);
		foreach($result as $category){
			$tasks[] = $category;
			$sql = "SELECT task.*, task_status.name as 'status', project.name as 'project' from task left join task_status on task_status.id = task.status_id left join project on project.id = task.project_id where status_id = '".$category->id."' order by id";
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
			$sql = "SELECT task.*, task_status.name as 'status', project.name as 'project' from task left join task_status on task_status.id = task.status_id left join project on project.id = task.project_id where id = '".$data->id."' order by id ";
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
			// echo json_encode($report, JSON_UNESCAPED_UNICODE);
	}else{
			$report->code = "Некорректное действие";
			echo $report;
	}
}else{
    $report->code = "ERROR";
    $report->info = "Некорректная модель";
    echo $report;
}

$db->closeConnection();

class report{
    public $code = 200;
    public $result;
    public $info;
}
