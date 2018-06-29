<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Employee extends Model
{

    protected $table = 'employee';

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
