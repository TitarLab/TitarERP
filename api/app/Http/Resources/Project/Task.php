<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Project\TaskMember as TaskMemberResource;
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
			"name" => $this->name,
			"id" => $this->id,
			"status" => $this->status->name,
			"statusId" => $this->status->id,
			"memberList" => (object)$memberList,
			"categoryId" => $this->category_id
        ];
    }
}
