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
	    'as' => 'clientList', 'uses' => 'ClientController@showList'
	]);
	$router->get('next/id', [
	    'uses' => 'ClientController@showNextId'
	]);
	$router->post('add', [
	    'as' => 'add', 'uses' => 'ClientController@add'
	]);
	$router->group(['prefix' => '{id}'], function () use ($router) {
		$router->get('/', [
		    'as' => 'client', 'uses' => 'ClientController@showCurrent'
		]);
		$router->post('save', [
		    'as' => 'add', 'uses' => 'ClientController@save'
		]);
		$router->delete('remove', [
			'as' => 'remove', 'uses' => 'ClientController@remove'
		]);
		$router->group(['prefix' => 'comment'], function () use ($router) {
			$router->get('list', [
			    'as' => 'commentList', 'uses' => 'ClientCommentController@showList'
			]);
			$router->post('add', [
			    'as' => 'add', 'uses' => 'ClientCommentController@add'
			]);
			$router->get('test', [
			    'as' => 'add', 'uses' => 'ClientCommentController@test'
			]);
			$router->delete('{idComment}/remove', [
			    'as' => 'remove', 'uses' => 'ClientCommentController@remove'
			]);
		});
	});

});

$router->group(['prefix' => 'employee'], function () use ($router) {
	$router->get('list', [
	    'uses' => 'EmployeeController@showList'
	]);
	$router->get('next/id', [
	    'uses' => 'EmployeeController@showNextId'
	]);
	$router->post('add', [
	    'uses' => 'EmployeeController@add'
	]);
	$router->post('search', [
	    'uses' => 'EmployeeController@search'
	]);
	$router->group(['prefix' => '{id}'], function () use ($router) {
		$router->get('/', [
		 	'uses' => 'EmployeeController@showCurrent'
		]);
		$router->post('save', [
		    'uses' => 'EmployeeController@save'
		]);
		$router->delete('remove', [
			'uses' => 'EmployeeController@remove'
		]);
	});

});

$router->group(['prefix' => 'project'], function () use ($router) {
	$router->get('list', [
	    'uses' => 'ProjectController@showList'
	]);
	$router->get('next/id', [
	    'uses' => 'ProjectController@showNextId'
	]);
	$router->post('add', [
	    'uses' => 'ProjectController@add'
	]);
	$router->post('search', [
	    'uses' => 'ProjectController@search'
	]);
	$router->group(['prefix' => '{id}'], function () use ($router) {
		$router->get('/', [
		 	'uses' => 'ProjectController@showCurrent'
		]);
		$router->post('save', [
		    'uses' => 'ProjectController@save'
		]);
		$router->delete('remove', [
			'uses' => 'ProjectController@remove'
		]);
		$router->delete('tag/{projectTagId}/remove', [
			'uses' => 'ProjectController@removeTag'
		]);
		$router->post('tag/add', [
			'uses' => 'ProjectController@addTag'
		]);
		$router->delete('category/{projectTaskCategoryId}/remove', [
			'uses' => 'ProjectController@removeCategory'
		]);
		$router->post('category/add', [
			'uses' => 'ProjectController@addCategory'
		]);
		$router->post('task/add', [
		    'uses' => 'TaskController@add'
		]);
		$router->post('task/{taskId}/save', [
		    'uses' => 'TaskController@save'
		]);
	});

});

$router->group(['prefix' => 'tag'], function () use ($router) {
	$router->post('search', [
	    'uses' => 'TagController@search'
	]);

});

$router->group(['prefix' => 'task'], function () use ($router) {
	$router->get('list', [
	    'uses' => 'TaskController@showList'
	]);
	$router->get('status/list', [
	    'uses' => 'TaskController@showStatusList'
	]);


});
