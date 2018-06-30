<?php

namespace App\Http\Resources\Task;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Task\Task as TaskResource;
use App\Http\Resources\Task\TaskMember as TaskMemberResource;

class Task extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
		$tempMemberList = TaskMemberResource::collection($this->members);
		$memberList = array();
		foreach ($tempMemberList as $employee) {
			$employee = $employee->toArray($request);
			$memberList += array($employee["id"] => $employee);
		}
        return [
			"id" => $this->id,
			"project_id" => $this->project_id,
			"name" => $this->name,
			"status_id" => $this->status_id,
			"category_id" => $this->category_id,
			"deadline" => $this->deadline,
			"priority" => $this->priority,
			"status" => $this->status->name,
			"category" => $this->category['name'],
			"project" => $this->project->name,
			"memberList" => (object)$memberList
        ];
    }
}
