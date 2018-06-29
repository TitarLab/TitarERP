<?php

namespace App\Http\Resources\Employee;

use Illuminate\Http\Resources\Json\JsonResource;

class Client extends JsonResource
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
			"firstname" => $this->firstname,
			"lastname" => $this->lastname,
        ];
    }
}
