<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Employee extends Model
{

    protected $table = 'employee';
	public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
		"id",
		"firstname",
		"lastname",
		"photo",
		"email",
		"phone",
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
