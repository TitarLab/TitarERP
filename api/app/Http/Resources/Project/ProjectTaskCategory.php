<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Project\TaskCategory as TaskCategoryResource;
use App\Http\Resources\Project\Task as TaskResource;

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
		$tempTaskList = TaskResource::collection($taskCategory->tasks->where('project_id',$this->project_id));
		$list = array();
		foreach ($tempTaskList as $task) {
			$task = $task->toArray($task);
			$list += array($task["id"] => $task);
		}
        return [
			"name" => $taskCategory->name,
			"id" => $taskCategory->id,
			'list' => $list
        ];
    }
}
