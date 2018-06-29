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

}
