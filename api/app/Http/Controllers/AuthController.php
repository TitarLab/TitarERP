<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;

use App\Http\Resources\Auth\User as UserResource;

use App\Http\Resources\Report as Report;

class AuthController extends Controller
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

	public function login(Request $request){
		if($request->filled(['login','password'])){
			$user = User::where("login",$request->login)->first()->makeVisible(["password"]);
			if(password_verify($request->password,$user->password)){
				return response()->json(new Report("200",new UserResource($user),"Успешная авторизация"));
			}else{
				return response()->json(new Report("FAIL",null,"Неудачая авторизация"));
			}
		}else{
			return response()->json(new Report("FAIL",null,"Неудачая авторизация"));
		}
	}
}
