<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Employee;
use App\Http\Resources\Employee\Employee as EmployeeResource;
use App\Http\Resources\Report as Report;

class EmployeeController extends Controller
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
		$employeeList = EmployeeResource::collection(Employee::all());
		return  response()->json(new Report("200",$employeeList,"Список работников"));
	}
	public function showCurrent($id){
		$employee = new EmployeeResource(Employee::find($id));
		return  response()->json(new Report("200",$employee,"Работник"));
	}
	public function showNextId(){
		$id = Employee::all()->max('id');
		$id += 1;
		return  response()->json(new Report("200",$id,"Следующий ID работника"));
	}
	public function search(Request $request){
		// $firstnameList = EmployeeResource::collection(Employee::where("firstname","like","%".$request->value."%")->get());
		// $lastnameList = EmployeeResource::collection(Employee::where("lastname","like","%".$request->value."%")->get());
		$employeeList = EmployeeResource::collection(Employee::where("firstname","like","%".$request->value."%")->orWhere("lastname","like","%".$request->value."%")->get());
		return  response()->json(new Report("200",$employeeList,"Результат поиска"));
	}
	public function add(Request $request){
		if($request->filled(['id', 'firstname','lastname'])){
			$employee = new Employee;
			$employee->id = $request->id;
			$employee->firstname = $request->firstname;
			$employee->lastname = $request->lastname;
			if($request->filled('photo')){
				$employee->photo = $request->photo;
			}
			if($request->filled('email')){
				$employee->email = $request->email;
			}
			if($request->filled('phone')){
				$employee->phone = $request->phone;
			}
			$employee->save();
			return  response()->json(new Report("200",$employee,"Работник успешно добавлен"));
		}else{
			return response()->json(["info" => "Ошибка: Не введены Имя или Фамилия"]);
		}

	}
	public function save($id, Request $request){
		if($request->filled(['id','firstname','lastname'])){
			if($id == $request->id){
				$employee = Employee::find($id);
				$employee->firstname = $request->firstname;
				$employee->lastname = $request->lastname;
				if($request->filled('photo')){
					$employee->photo = $request->photo;
				}
				if($request->filled('email')){
					$employee->email = $request->email;
				}
				if($request->filled('phone')){
					$employee->phone = $request->phone;
				}
				$employee->save();
				return  response()->json(new Report("200",$employee,"Работник успешно сохранён"));
			}
		}else{
			return response()->json(["info" => "Ошибка!"]);
		}

	}
	public function remove($id){
		if($id > 0){
			Employee::destroy($id);
			return  response()->json(new Report("200",null,"Работник успешно удалён"));
		}
	}

}
