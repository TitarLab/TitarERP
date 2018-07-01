<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\TaskStatus;
use App\Models\TaskMember;
use App\Models\Task;

use App\Http\Resources\Task\TaskStatus as TaskStatusResource;
use App\Http\Resources\Task\TaskStatusWithoutList as TaskStatusWithoutListResource;
use App\Http\Resources\Task\TaskMember as TaskMemberResource;
use App\Http\Resources\Project\Task as TaskResource;
use App\Http\Resources\Report as Report;

class TaskController extends Controller
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
		$taskList = TaskStatusResource::collection(TaskStatus::all());
		return  response()->json(new Report("200",$taskList,"Список задач"));
	}
	public function showStatusList(){
		$statusList = TaskStatusWithoutListResource::collection(TaskStatus::all());
		return  response()->json(new Report("200",$statusList,"Список статусов задач"));
	}
	public function add($id,Request $request){
		if($request->filled(['name', 'statusId', 'categoryId'])){
			$task = new Task;
			$task->name = $request->name;
			$task->status_id = $request->statusId;
			$task->category_id = $request->categoryId;
			$task->project_id = $id;
			if($request->filled('priority')){
				$task->priority = $request->priority;
			}
			if($request->filled('deadline')){
				$task->deadline = $request->deadline;
			}
			$task->save();
			if($request->has('memberList')){
				foreach ($request->memberList as $employee) {
					$taskMember = new TaskMember;
					$taskMember->task_id = $task->id;
					$taskMember->employee_id = $employee["id"];
					$taskMember->save();
				}
			}
			$task->save();
			return  response()->json(new Report("200",new TaskResource($task),"Задача успешно добавлена"));
		}else{
			return response()->json(new Report("ERROR",null,"Ошибка в данных"));
		}
	}
	public function search(Request $request){
		$tagList = TagResource::collection(Tag::where("name","like","%".$request->value."%")->get());
		return  response()->json(new Report("200",$tagList,"Результат поиска"));
	}
}
