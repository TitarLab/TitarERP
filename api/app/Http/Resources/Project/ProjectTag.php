<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Project\Tag as TagResource;

class ProjectTag extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
		$tag = new TagResource($this->tag);
        return [
			"projectTagId" => $this->id,
			"id" => $tag['id'],
			"name" => $tag['name'],
			"color" => $tag['color'],
        ];
    }
}
