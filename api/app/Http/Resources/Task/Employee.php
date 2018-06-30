<?php

namespace App\Http\Resources\Task;

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
			"photo" => $this->photo,
        ];
    }
}
