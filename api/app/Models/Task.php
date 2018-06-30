<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Task extends Model
{

    protected $table = 'task';

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

	public function status(){
		return $this->belongsTo('App\Models\TaskStatus');
	}
	public function project(){
		return $this->belongsTo('App\Models\Project');
	}
	public function category(){
		return $this->belongsTo('App\Models\TaskCategory');
	}
	public function members(){
		return $this->hasMany('App\Models\TaskMember');
	}

}
