<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class User extends Model
{

    protected $table = 'user';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
		'password',
		'login'
    ];
	public function employee(){
		return $this->belongsTo('App\Models\Employee');
	}
}
