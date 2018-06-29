<?php

namespace App\Http\Resources\Client;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Client\Project as ProjectResource;
use App\Http\Resources\Client\ClientComment as ClientCommentResource;

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
		$commentListTemp = ClientCommentResource::collection($this->comments);
		$commentList = array();
		foreach ($commentListTemp as $comment) {
			$commentList += array($comment->id => $comment);
		}
        return [
			"id" => $this->id,
			"firstname" => $this->firstname,
			"lastname" => $this->lastname,
			"status" => $this->status,
			"lastContact" => $this->last_contact,
			"contacts" => $this->contacts,
			"note" => $this->note,
			"photo" => $this->photo,
			"email" => $this->email,
			"phone" => $this->phone,
			"projectList" => ProjectResource::collection($this->projects),
			"commentList" => (object)$commentList,
        ];
    }
}
