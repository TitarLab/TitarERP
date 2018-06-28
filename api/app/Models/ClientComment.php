<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class ClientComment extends Model
{

    protected $table = 'client_comment';
	public $timestamps = false;

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
		//'password',
    ];
	public function employee(){
		return $this->hasOne('App\Models\Employee');
	}
	public function user(){
		return $this->belongsTo('App\Models\User');
	}
}
