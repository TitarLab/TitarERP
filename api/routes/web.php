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

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'client'], function () use ($router) {
	$router->get('list', [
	    'as' => 'clientList', 'uses' => 'ClientController@showList'
	]);
	$router->post('add', [
	    'as' => 'add', 'uses' => 'ClientController@add'
	]);
	$router->delete('remove/{id}', [
	    'as' => 'remove', 'uses' => 'ClientController@remove'
	]);
	$router->group(['prefix' => '{id}'], function () use ($router) {
		$router->get('/', [
		    'as' => 'client', 'uses' => 'ClientController@showClient'
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
			$router->delete('remove/{idComment}', [
			    'as' => 'remove', 'uses' => 'ClientCommentController@remove'
			]);
		});
	});

});
