<?php

namespace App\Http\Controllers;
use App\Models\{Persone,Note};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class Notecontroller extends Controller
{
    public function AddNote(Request $request){
        $data=Auth::user();
        $validate=$request->validate([
            'note_text'=>'required|min:20'
        ]);
        $req=Note::create([
            'user_id'=>$data->id,
            'note_text'=>$request->note_text,
            'is_favorite'=>false,
            'is_trash'=>false
        ]);
        if (!$req) {
            return response()->json(['msg'=>'error']);
        }
        return response()->json(['msg'=>'Note created!!!']);
    }

    public function EditNote(Request $request,$id){
        $data=Auth::user();
        $user=$data->id;
        $note=Note::where('user_id',$user)->where('id',$id)->first();
        if (!$note) {
            return response()->json(['msg'=>"error"]);  
        }
        $note->note_text=$request->note_text;
        $note->save();
        return response()->json(['msg'=>'Note updated']);
    }
    public function Favorite(Request $request,$id){
        $data=Auth::user();
        $user=$data->id;
        $note=Note::where('user_id',$user)->where('id',$id)->first();
        $note->is_favorite=true;
        $note->save();
        return response()->json(['msg'=>'Note placed in favorite']);
    }
    public function Trash(Request $request,$id){
        $data=Auth::user();
        $user=$data->id;
        $note=Note::where('user_id',$user)->where('id',$id)->first();
        $note->is_trash=true;
        $note->is_favorite=false;
        $note->save();
        return response()->json(['msg'=>'Note placed in trash']);
    }
    public function Delete(Request $request,$id){
        $data=Auth::user();
        $user=$data->id;
        $note=Note::where('user_id',$user)->where('id',$id)->first();
        $note->delete();
        return response()->json(['msg'=>'Note deleted']);
    }
}
