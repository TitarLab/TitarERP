<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Resources\Json\JsonResource;

class Tag extends JsonResource
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
			"name" => $this->name,
			"color" => $this->color,
        ];
    }
}
