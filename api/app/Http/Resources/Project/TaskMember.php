<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Project\Employee as EmployeeResource;

class TaskMember extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
		$employee = new EmployeeResource($this->employee);
        return [
			"id" => $employee["id"],
			"firstname" => $employee["id"],
			"lastname" => $employee["firstname"],
			"photo" => $employee["photo"],
        ];
    }
}
