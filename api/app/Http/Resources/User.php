<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Employee as EmployeeResource;

class User extends JsonResource
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
			"id" => $this->id,
			"employeeId" => $this->employee_id,
			"firstname" => $employee["firstname"],
			"lastname" => $employee["lastname"],
        ];
    }
}
