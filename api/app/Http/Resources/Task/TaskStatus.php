<?php

namespace App\Http\Resources\Task;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Task\Task as TaskResource;

class TaskStatus extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
		$tempList = TaskResource::collection($this->tasks2);
		$list = array();
		foreach ($tempList as $task) {
			$list += array($task->id => $task);
		}
        return [
			"name" => $this->name,
			"id" => $this->id,
			"listName" => $this->list_name,
			"list" => (object)$list
        ];
    }
}
