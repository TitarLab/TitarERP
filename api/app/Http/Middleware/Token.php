<?php

namespace App\Http\Middleware;

use Closure;
use App\Http\Resources\Report as Report;

class Token
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
		if($request->cookie("token") == null){
			return response()->json(new Report("UNAUTHORIZED",null,"Пользователь не авторизирован"), 401);
		}
        return $next($request);
    }
}
