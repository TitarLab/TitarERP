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
		// if(){
		//
		// }

		$comment = new ClientComment;
		$comment->text = $request->text;
		$comment->date_created = date("Y-m-d H:i:s");
		$comment->user_id = $request->user_id;
		$comment->client_id = $request->client_id;
		$comment->save();
		$comment = ClientComment::where("client_id",$id)->orderBy("id","desc")->first();
		return  response()->json($comment);
	}
	public function test($id){
		$comment = ClientComment::where("client_id",$id)->orderBy("id","desc")->first();
		return  response()->json($comment);
	}
	public function remove($id, $idComment){
		if($idComment >0){
			ClientComment::destroy($idComment);
		}
	}

}
