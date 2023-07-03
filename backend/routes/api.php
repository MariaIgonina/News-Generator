<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ArticlesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/me', [UserController::class, 'me']);
    Route::post('/refresh', [UserController::class, 'refresh']);
    Route::middleware('auth:web')->post('/delete', [UserController::class, 'delete']);
    Route::middleware('auth:web')->post('/logout', [UserController::class, 'logout']);

    Route::middleware('auth:web')->post('/suggestions', [ArticlesController::class, 'suggestions']);
});

Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::post('/search', [ArticlesController::class, 'newSearch']);//
    Route::get('/result', [ArticlesController::class, 'getNews']);//
    Route::get('/getnew/{id}', [ArticlesController::class, 'getOneNew']);
    Route::get('/options', [ArticlesController::class, 'getOptions']);//
    Route::middleware('auth:web')->post('/suggestions', [ArticlesController::class, 'suggestions']);
});