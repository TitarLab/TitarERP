<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Project as ProjectResource;
use App\Http\Resources\ClientComment as ClientCommentResource;

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
			"lastname" => $this->lastname
        ];
    }
}
