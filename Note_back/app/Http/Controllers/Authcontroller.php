<?php

namespace App\Http\Controllers;
use App\Models\Persone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;

class Authcontroller extends Controller
{
    public function register(Request $request){
        $validate= $request->validate([
            'Fullname'=>'required|min:4',
            'email'=>'email|required',
            'password'=>'required|min:6'
        ]);
        $per = Persone::create([
            'Fullname'=>$request->Fullname,
            'email'=>$request->email,
            'password'=>Hash::make($request->password)
        ]);
        if (!$per) {
            return response()->json(['msg'=>'error']);
        }
        return response()->json(['msg'=>'user created!!!']);
    }
    public function login(Request $request){
        $info=$request->only(['email','password']);
        $token=Auth()->attempt($info);
        if (!$token) {
            return response()->json([
                'error'=>'there is an error'
            ],401);
        }
        return $this->respondWithToken($token);
    }
    public function logout(Request $request){
        try {
        $req=Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
        } catch(JWTException $e){
            return response()->json(['error' => 'Token is missing'], 401);
        }
    }
    public function me(Request $request){
        $data=Auth::user();
        return response()->json($data);
    }
    public function respondWithToken($token){
        $req=[
            'acces_token'=>$token,
            'token_type'=>'bearer',
            'expire_in'=>auth()->factory()->getTTL() * 60
        ];
        return response()->json($req);
    }
}
