<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\ProjectTag;
use App\Models\Tag;
use App\Models\Task;
use App\Models\TaskMember;
use App\Models\ProjectTaskCategory;
use App\Models\TaskCategory;
use App\Http\Resources\Project\Project as ProjectResource;
use App\Http\Resources\Project\ProjectTag as ProjectTagResource;
use App\Http\Resources\Project\Tag as TagResource;
use App\Http\Resources\Project\ProjectTaskCategory as ProjectTaskCategoryResource;
use App\Http\Resources\Report as Report;

class ProjectController extends Controller
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

	public function showList(){
		$projectList = ProjectResource::collection(Project::all());
		return  response()->json(new Report("200",$projectList,"Список проектов"));
	}
	public function showCurrent($id){
		$project = new ProjectResource(Project::findOrFail($id));
		return  response()->json(new Report("200",$project,"Проект"));
	}
	public function showNextId(){
		$id = Project::all()->max('id');
		$id += 1;
		return  response()->json(new Report("200",$id,"Следующий ID проекта"));
	}
	// public function search(Request $request){
	// 	$employeeList = ProjectResource::collection(Project::where("firstname","like","%".$request->value."%")->orWhere("lastname","like","%".$request->value."%")->get());
	// 	return  response()->json(new Report("200",$employeeList,"Результат поиска"));
	// }
	public function add(Request $request){
		if($request->filled(['id', 'name'])){
			$project = new Project;
			$project->id = $request->id;
			$project->name = $request->name;
			if($request->filled('url')){
				$project->url = $request->url;
			}
			if($request->filled('clientId')){
				$project->client_id = $request->clientId;
			}
			if($request->has('tagList')){
				foreach ($request->tagList as $tag) {
					$projectTag = new ProjectTag;
					$projectTag->tag_id = $tag["id"];
					$projectTag->project_id = $request->id;
					$projectTag->save();
				}
			}
			$project->save();
			return  response()->json(new Report("200",$project,"Проект успешно добавлен"));
		}else{
			return response()->json(new Report("ERROR",null,"Нет названия проекта"));
		}
	}
	public function addCategory($id,Request $request){
		if($request->filled(['name'])){
			$taskCategory = TaskCategory::firstOrNew(
			    ['name' => $request->name]
			);
			$taskCategory->save();
			$categoryId = ProjectTaskCategory::all()->max('id');
			$categoryId += 1;
			$projectTaskCategory = ProjectTaskCategory::where("project_id",$id)->where("task_category_id",$taskCategory->id)->first();
			if($projectTaskCategory == null){
				$projectTaskCategory = new ProjectTaskCategory;
				$projectTaskCategory->id = $categoryId;
				$projectTaskCategory->project_id = $id;
				$projectTaskCategory->task_category_id = $taskCategory->id;
				$projectTaskCategory->save();
				return  response()->json(new Report("200",new ProjectTaskCategoryResource($projectTaskCategory),"Категория успешно добавлена"));
			}else{
				return  response()->json(new Report("EXIST",null,"Категория уже существует"));
			}
		}else{
			return response()->json(["info" => "Ошибка: Нет названия категории"]);
		}
	}
	public function addTag($id,Request $request){
		if($request->filled(['name'])){
			$tag = Tag::firstOrNew(
			    ['name' => $request->name]
			);
			$tag->save();
			if($request->addToProject == true){
				$projectTag = ProjectTag::where("project_id",$id)->where("tag_id",$tag->id)->first();
				if($projectTag == null){
					$projectTagId = ProjectTag::all()->max('id');
					$projectTagId += 1;
					$projectTag = new ProjectTag;
					$projectTag->id = $projectTagId;
					$projectTag->project_id = $id;
					$projectTag->tag_id = $tag->id;
					$projectTag->save();
					return  response()->json(new Report("200",new ProjectTagResource($projectTag),"Тег успешно добавлен"));
				}else{
					return  response()->json(new Report("EXIST",null,"Тег уже существует"));
				}
			}
			return  response()->json(new Report("200",new TagResource($tag),"Тег успешно добавлен"));
		}else{
			return response()->json(new Report("ERROR",null,"Нет названия тега"));
		}
	}

	public function save($id, Request $request){
		if($request->filled(['id','name'])){
			if($id == $request->id){
				$project = Project::findOrFail($id);
				$project->name = $request->name;
				if($request->has('url')){
					$project->url = $request->url;
				}
				if($request->has('clientId')){
					$project->client_id = $request->clientId;
				}
				$project->save();
				return  response()->json(new Report("200",$project,"Проект успешно сохранён"));
			}
		}else{
			return response()->json(new Report("ERROR",null,"Ошибка"));
		}
	}
	public function remove($id){
		if($id > 0){
			Project::destroy($id);
			ProjectTag::where('project_id', $id)->delete();
			ProjectTaskCategory::where('project_id', $id)->delete();
			foreach (Task::where('project_id', $id)->get() as $task) {
				TaskMember::where('task_id', $task->id)->delete();
			}
			Task::where('project_id', $id)->delete();
			return  response()->json(new Report("200",null,"Проект успешно удалён"));
		}
	}
	public function removeTag($id,$projectTagId){
		if($id > 0 && $projectTagId > 0){
			ProjectTag::destroy($projectTagId);
			return  response()->json(new Report("200",null,"Тег успешно удалён"));
		}
	}
	public function removeCategory($id,$projectTaskCategoryId){
		if($id > 0 && $projectTaskCategoryId > 0){
			ProjectTaskCategory::where('project_id', $id)->where("task_category_id", $projectTaskCategoryId)->delete();
			return  response()->json(new Report("200",null,"Категория успешно удалена"));
		}
	}
}
