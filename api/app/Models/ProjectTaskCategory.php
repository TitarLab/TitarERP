<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class ProjectTaskCategory extends Model
{

    protected $table = 'project_task_category';

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

	public function taskCategory(){
		return $this->belongsTo('App\Models\TaskCategory');
	}

}
