<?php

namespace App\Http\Resources\Auth;

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
			"firstname" => $employee["firstname"],
			"lastname" => $employee["lastname"],
			"email" => $employee["email"],
        ];
    }
}
