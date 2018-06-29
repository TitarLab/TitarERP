<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Client;
use App\Http\Resources\Client\Client as ClientResource;

class ClientController extends Controller
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
		return  response()->json($clientList);
	}
	public function showCurrent($id){
		$client = new ClientResource(Client::find($id));
		return  response()->json($client);
	}
	public function showNextId(){
		$id = Client::all()->max('id');
		$id += 1;
		return  response()->json(["info" => "Получен следующий id", 'result' => $id]);
	}
	public function add(Request $request){
		if($request->filled(['id', 'firstname','lastname'])){
			$client = new Client;
			$client->id = $request->id;
			$client->firstname = $request->firstname;
			$client->lastname = $request->lastname;
			if($request->filled('status')){
				$client->status = $request->status;
			}
			if($request->filled('lastContact')){
				$client->last_contact = $request->lastContact;
			}
			if($request->filled('contacts')){
				$client->contacts = $request->contacts;
			}
			if($request->filled('note')){
				$client->note = $request->note;
			}
			if($request->filled('photo')){
				$client->photo = $request->photo;
			}
			if($request->filled('email')){
				$client->email = $request->email;
			}
			if($request->filled('phone')){
				$client->phone = $request->phone;
			}
			$client->save();
			return response()->json(["info" => "Клиент успешно добавлен!"]);
		}else{
			return response()->json(["info" => "Ошибка!"]);
		}

	}
	public function save($id, Request $request){
		if($request->filled(['id','firstname','lastname'])){
			if($id == $request->id){
				$client = Client::find($id);
				$client->firstname = $request->firstname;
				$client->lastname = $request->lastname;
				if($request->filled('status')){
					$client->status = $request->status;
				}
				if($request->filled('lastContact')){
					$client->last_contact = $request->lastContact;
				}
				if($request->filled('contacts')){
					$client->contacts = $request->contacts;
				}
				if($request->filled('note')){
					$client->note = $request->note;
				}
				if($request->filled('photo')){
					$client->photo = $request->photo;
				}
				if($request->filled('email')){
					$client->email = $request->email;
				}
				if($request->filled('phone')){
					$client->phone = $request->phone;
				}
				$client->save();
				return response()->json(["info" => "Клиент успешно сохранён!"]);
			}
		}else{
			return response()->json(["info" => "Ошибка!"]);
		}

	}
	public function remove($id){
		if($id > 0){
			Client::destroy($id);
			return response()->json(["info" => "Клиент успешно удалён!"]);
		}
	}

}
