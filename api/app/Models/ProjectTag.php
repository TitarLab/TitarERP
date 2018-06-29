<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class ProjectTag extends Model
{

    protected $table = 'project_tag';

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

	public function tag(){
		return $this->belongsTo('App\Models\Tag');
	}

}
