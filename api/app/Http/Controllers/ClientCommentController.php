<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\ClientComment;

class ClientCommentController extends Controller
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
	public function showList($id){
		$commentList = ClientComment::where('client_id',$id)
							->orderBy('id','asc')
							->get();
		return  response()->json($commentList);
	}
	public function add($id,Request $request){
		if($request->filled(['text', 'userId'])){
			$comment = new ClientComment;
			$comment->text = $request->text;
			$comment->user_id = $request->userId;
			$comment->client_id = $id;
			$comment->save();
			$comment = ClientComment::where("client_id",$id)->orderBy("id","desc")->first();
			return  response()->json(["info" => "Комментарий успешно добавлен!", "result" => $comment]);
		}else{
			return response()->json(["info" => "Ошибка!"]);
		}
	}
	public function remove($id, $idComment){
		if($idComment >0){
			ClientComment::destroy($idComment);
			return response()->json(["info" => $idComment]);
		}
	}

}
