<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Project\TaskCategory as TaskCategoryResource;

class ProjectTaskCategory extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
		$taskCategory = new TaskCategoryResource($this->taskCategory);
		$taskCategory = $taskCategory->toArray($request);
        return [
			"name" => $taskCategory['name'],
			"id" => $taskCategory['id'],
			'list' => $taskCategory['list']
        ];
    }
}
