<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
class AuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user=JWTAuth::parseToken()->authenticate();
        try {
            if (!$user) {
                return response()->json(['error'=>'user not found'],404);
            }
        } catch (TokenExpiredException $e) {
            return response()->json(['error'=>'Token is expired'],401);
        } catch(TokenInvalidException $e){
            return response()->json(['error'=>'Token is invalid'],401);
        } catch(JWTException $e){
            return response()->json(['error' => 'Token is missing'], 401);
        }
        return $next($request);
    }
    
}
