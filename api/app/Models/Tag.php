<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Tag extends Model
{

    protected $table = 'tag';

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


}
