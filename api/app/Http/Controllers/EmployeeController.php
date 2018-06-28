<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Employee;
use App\Http\Resources\Employee as ClientResource;

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
		$clientList = ClientResource::collection(Client::all());
		foreach ($clientList as $client) {
			$client->projectList = $client->projects;
		}
		return  response()->json($clientList);
	}
	public function showClient($id){
		$client = new ClientResource(Client::find($id));
		return  response()->json($client);
	}
	public function add(Request $request){
		// if(){
		//
		// }
		$client = new Client;
		$client->id = $request->id;
		$client->firstname = $request->firstname;
		$client->lastname = $request->lastname;
		$client->status = $request->status;
		$client->last_contact = $request->last_contact;
		$client->contacts = $request->contacts;
		$client->note = $request->note;
		$client->photo = $request->photo;
		$client->email = $request->email;
		$client->phone = $request->phone;
		$client->save();
	}
	public function remove($id){
		if($id > 0){
			Client::destroy($id);
		}
	}

}
