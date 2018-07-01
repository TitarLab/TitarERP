<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Client extends Model
{

    protected $table = 'client';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
		"id",
		"firstname",
		"lastname"
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
		//'password',
    ];

	public function projects(){
		return $this->hasMany('App\Models\Project');
	}
	public function comments(){
		return $this->hasMany('App\Models\ClientComment');
	}
}
