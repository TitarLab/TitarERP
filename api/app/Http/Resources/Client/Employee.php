<?php

namespace App\Http\Resources\Client;

use Illuminate\Http\Resources\Json\JsonResource;


class Employee extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
			"id" => $this->id,
			"firstname" => $this->firstname,
			"lastname" => $this->lastname,
			"salary" => $this->salary,
			"photo" => $this->photo,
			"email" => $this->email,
			"phone" => $this->phone
        ];
    }
}
