<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Project extends Model
{

    protected $table = 'project';
	public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
		"id",
		"client_id",
		"name",
		"url",
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
