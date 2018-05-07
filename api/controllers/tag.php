<?php

if($data->action == "search"){
		$sql = "SELECT project.*,client.firstname, client.lastname from project left join client on client.id = project.client_id where 1 order by id ";
		$result = $db->request($sql);
		foreach ($result as $project) {
			$sql = "SELECT tag.id, tag.name, tag.color from project_tag left join tag on tag.id = project_tag.tag_id where project_id = '".$project->id."' order by id";
			$tags = $db->request($sql);
			$project->tagList = $tags;
		}
		$report->code = 200;
		$report->result = $result;
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}
