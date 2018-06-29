<?php

namespace App\Http\Resources\Client;

use Illuminate\Http\Resources\Json\JsonResource;

class Project extends JsonResource
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
			"url" => $this->url,
			"clientId" => $this->client_id,
        ];
    }
}
