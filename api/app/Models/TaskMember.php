<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class TaskMember extends Model
{

    protected $table = 'task_member';

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
		return $this->belongsTo('App\Models\Employee');
	}

}
