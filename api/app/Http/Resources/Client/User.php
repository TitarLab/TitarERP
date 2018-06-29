<?php

namespace App\Http\Resources\Client;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Client\Employee as EmployeeResource;

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
