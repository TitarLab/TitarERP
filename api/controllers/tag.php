<?php

if($data->action == "search"){
	$result = $db->select("project",[
		"[>]client" => ["client.id" => "project.client_id"]
	],[
		"project.*",
		"client.firstname",
		"client.lastname",
	],[
		"ORDER" => ["id" => "ASC"],
	]);
		foreach ($result as $project) {
			$project->tagList = $db->select("project_tag",[
				"[>]tag" => ["tag.id" => "project_tag.tag_id"]
			],[
				"tag.id",
				"tag.name",
				"tag.color",
			],[
				"ORDER" => ["id" => "ASC"],
				"project_id" => $project->id
			]);
		}
		$report->code = 200;
		$report->result = $result;
		echo json_encode($report, JSON_UNESCAPED_UNICODE);
}
