<?php

namespace App\Http\Resources\Task;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Task\Task as TaskResource;

class TaskStatusWithoutList extends JsonResource
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
			"name" => $this->name,
			"id" => $this->id,
			"listName" => $this->list_name,
        ];
    }
}
