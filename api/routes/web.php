<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

// $router->get('/', function () use ($router) {
//     return $router->app->version();
// });

$router->group(['prefix' => 'client'], function () use ($router) {
	$router->get('list', [
	    'middleware' => 'token', 'as' => 'clientList', 'uses' => 'ClientController@showList'
	]);
	$router->get('next/id', [
	    'middleware' => 'token','uses' => 'ClientController@showNextId'
	]);
	$router->post('add', [
	    'middleware' => 'token','as' => 'add', 'uses' => 'ClientController@add'
	]);
	$router->group(['prefix' => '{id}'], function () use ($router) {
		$router->get('/', [
		    'middleware' => 'token','as' => 'client', 'uses' => 'ClientController@showCurrent'
		]);
		$router->post('save', [
		    'middleware' => 'token','as' => 'add', 'uses' => 'ClientController@save'
		]);
		$router->delete('remove', [
			'middleware' => 'token','as' => 'remove', 'uses' => 'ClientController@remove'
		]);
		$router->group(['prefix' => 'comment'], function () use ($router) {
			$router->get('list', [
			    'middleware' => 'token','as' => 'commentList', 'uses' => 'ClientCommentController@showList'
			]);
			$router->post('add', [
			    'middleware' => 'token','as' => 'add', 'uses' => 'ClientCommentController@add'
			]);
			$router->get('test', [
			    'middleware' => 'token','as' => 'add', 'uses' => 'ClientCommentController@test'
			]);
			$router->delete('{idComment}/remove', [
			    'middleware' => 'token','as' => 'remove', 'uses' => 'ClientCommentController@remove'
			]);
		});
	});

});

$router->group(['prefix' => 'employee'], function () use ($router) {
	$router->get('list', [
	    'middleware' => 'token','uses' => 'EmployeeController@showList'
	]);
	$router->get('next/id', [
	    'middleware' => 'token','uses' => 'EmployeeController@showNextId'
	]);
	$router->post('add', [
	    'middleware' => 'token','uses' => 'EmployeeController@add'
	]);
	$router->post('search', [
	    'middleware' => 'token','uses' => 'EmployeeController@search'
	]);
	$router->group(['prefix' => '{id}'], function () use ($router) {
		$router->get('/', [
		 	'middleware' => 'token','uses' => 'EmployeeController@showCurrent'
		]);
		$router->post('save', [
		    'middleware' => 'token','uses' => 'EmployeeController@save'
		]);
		$router->delete('remove', [
			'middleware' => 'token','uses' => 'EmployeeController@remove'
		]);
	});

});

$router->group(['prefix' => 'project'], function () use ($router) {
	$router->get('list', [
	    'middleware' => 'token','uses' => 'ProjectController@showList'
	]);
	$router->get('next/id', [
	    'middleware' => 'token','uses' => 'ProjectController@showNextId'
	]);
	$router->post('add', [
	    'middleware' => 'token','uses' => 'ProjectController@add'
	]);
	$router->post('search', [
	    'middleware' => 'token','uses' => 'ProjectController@search'
	]);

	$router->group(['prefix' => '{id}'], function () use ($router) {
		$router->get('/', [
		 	'middleware' => 'token','uses' => 'ProjectController@showCurrent'
		]);
		$router->post('save', [
		    'middleware' => 'token','uses' => 'ProjectController@save'
		]);
		$router->delete('remove', [
			'middleware' => 'token','uses' => 'ProjectController@remove'
		]);
		$router->delete('tag/{projectTagId}/remove', [
			'middleware' => 'token','uses' => 'ProjectController@removeTag'
		]);
		$router->post('tag/add', [
			'middleware' => 'token','uses' => 'ProjectController@addTag'
		]);
		$router->delete('category/{projectTaskCategoryId}/remove', [
			'middleware' => 'token','uses' => 'ProjectController@removeCategory'
		]);
		$router->post('category/add', [
			'middleware' => 'token','uses' => 'ProjectController@addCategory'
		]);
		$router->post('task/add', [
		    'middleware' => 'token','uses' => 'TaskController@add'
		]);
		$router->delete('task/{taskId}/remove', [
		    'middleware' => 'token','uses' => 'TaskController@remove'
		]);
		$router->post('task/{taskId}/save', [
		    'middleware' => 'token','uses' => 'TaskController@save'
		]);
		$router->post('task/{taskId}/setStatus/', [
		    'middleware' => 'token','uses' => 'TaskController@setStatus'
		]);
		$router->post('task/{taskId}/member/add', [
		    'middleware' => 'token','uses' => 'TaskController@addMember'
		]);
		$router->delete('task/{taskId}/member/{employeeId}/remove', [
		    'middleware' => 'token','uses' => 'TaskController@removeMember'
		]);
	});

});

$router->group(['prefix' => 'tag'], function () use ($router) {
	$router->post('search', [
	    'middleware' => 'token','uses' => 'TagController@search'
	]);
});

$router->group(['prefix' => 'task'], function () use ($router) {
	$router->get('list', [
	    'middleware' => 'token','uses' => 'TaskController@showList'
	]);
	$router->get('status/list', [
	    'middleware' => 'token','uses' => 'TaskController@showStatusList'
	]);
	$router->post('search/category', [
	    'middleware' => 'token','uses' => 'TaskController@searchCategory'
	]);
});
