<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class TaskCategory extends Model
{

    protected $table = 'task_category';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
		"name"
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
		return $this->hasMany('App\Models\Task', 'category_id');
	}

}
