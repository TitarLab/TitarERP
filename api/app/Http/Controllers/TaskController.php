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
	public function addMember($id,$taskId,Request $request){
		if($request->filled(['employeeId'])){
			$taskMember = new TaskMember;
			$taskMember->task_id = $taskId;
			$taskMember->employee_id = $request->employeeId;
			$taskMember->save();
			return  response()->json(new Report("200",new TaskMemberResource($taskMember),"Участник задачи успешно добавлен"));
		}else{
			return response()->json(new Report("ERROR",null,"Ошибка в данных"));
		}
	}
	public function save($id,$taskId, Request $request){
		if($request->filled(['name', 'statusId'])){
			$task = Task::findOrFail($taskId);
			if($id == $task->project_id){
				$task->name = $request->name;
				$task->status_id = $request->statusId;
				if($request->filled('priority')){
					$task->priority = $request->priority;
				}
				if($request->filled('deadline')){
					$task->deadline = $request->deadline;
				}
				$task->save();
				return  response()->json(new Report("200",$task,"Задача успешно сохранена"));
			}
		}else{
			return response()->json(new Report("ERROR",null,"Ошибка"));
		}
	}
	public function remove($id, $taskId){
		if($taskId > 0){
			Task::destroy($taskId);
			return  response()->json(new Report("200",null,"Задача успешно удалена"));
		}
	}
	public function removeMember($id,$taskId, $employeeId){
		if($employeeId > 0){
			TaskMember::where('task_id', $taskId)->where("employee_id", $employeeId)->delete();
			return  response()->json(new Report("200",null,"Участник задачи успешно удалён"));
		}
	}
	public function search(Request $request){
		$tagList = TagResource::collection(Tag::where("name","like","%".$request->value."%")->get());
		return  response()->json(new Report("200",$tagList,"Результат поиска"));
	}
}
