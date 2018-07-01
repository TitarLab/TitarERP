<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Project\Task as TaskResource;

class TaskCategory extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
		$tempTaskList = TaskResource::collection($this->tasks);
		$list = array();
		foreach ($tempTaskList as $task) {
			$task = $task->toArray($task);
			$list += array($task["id"] => $task);
		}
        return [
			"name" => $this->name,
			"id" => $this->id,
			"list" => (object)$list
        ];
    }
}
