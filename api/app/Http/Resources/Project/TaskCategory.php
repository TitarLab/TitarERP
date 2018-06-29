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
        return [
			"name" => $this->name,
			"id" => $this->id,
			"list" => TaskResource::collection($this->tasks)
        ];
    }
}
