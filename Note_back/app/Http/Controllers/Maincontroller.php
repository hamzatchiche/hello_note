<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;

class Maincontroller extends Controller
{
    public function main(Request $request)
    {
        $user = auth()->user(); 

        
        $notes = Note::where('user_id', $user->id)->get();

        return response()->json($notes);
    }

}
