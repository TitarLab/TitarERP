<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Tag;
use App\Http\Resources\Project\Tag as TagResource;
use App\Http\Resources\Report as Report;

class TagController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function __construct()
    {
		//
    }

	public function search(Request $request){
		$tagList = TagResource::collection(Tag::where("name","like","%".$request->value."%")->get());
		return  response()->json(new Report("200",$tagList,"Результат поиска"));
	}
}
