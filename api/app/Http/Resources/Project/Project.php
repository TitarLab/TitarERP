<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Project\Client as ClientResource;
use App\Http\Resources\Project\ProjectTag as ProjectTagResource;
use App\Http\Resources\Project\ProjectTaskCategory as ProjectTaskCategoryResource;

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
		$client = new ClientResource($this->client);
		$tempTagList = ProjectTagResource::collection($this->tags);
		$TagList = array();
		foreach ($tempTagList as $tag) {
			$TagList += array($tag->id => $tag);
		}
        return [
			"id" => $this->id,
			"name" => $this->name,
			"url" => $this->url,
			"clientId" => $this->client_id,
			"firstname" => $client["firstname"],
			"lastname" => $client["lastname"],
			"tagList" => (object)$TagList,
			"categoryList" => ProjectTaskCategoryResource::collection($this->projectTaskCategories)
        ];
    }
}
