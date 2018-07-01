<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Project extends Model
{

    protected $table = 'project';

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

	public function client(){
		return $this->belongsTo('App\Models\Client');
	}
	public function tags(){
		return $this->hasMany('App\Models\ProjectTag');
	}
	public function projectTaskCategories(){
		return $this->hasMany('App\Models\ProjectTaskCategory');
	}
}
