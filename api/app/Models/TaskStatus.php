<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class TaskStatus extends Model
{

    protected $table = 'task_status';

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
	public function tasks(){
		return $this->hasMany('App\Models\Task');
	}
	public function tasks2(){
		return $this->hasMany('App\Models\Task', 'status_id');
	}
}
