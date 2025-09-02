<?php

/**
 * Routes web de l'application Laravel
 * 
 * Ce fichier définit :
 * - Les routes web de base
 * - La page d'accueil
 * - Les routes de santé de l'application
 * - Les routes de maintenance
 */

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return response()->json([
        'message' => 'To-Do App Backend API',
        'version' => '1.0.0',
        'status' => 'running',
        'timestamp' => now()->toISOString(),
        'endpoints' => [
            'api' => '/api',
            'health' => '/up',
            'tasks' => '/api/tasks'
        ]
    ]);
});

Route::get('/up', function () {
    return response()->json([
        'status' => 'OK',
        'message' => 'Application is running',
        'timestamp' => now()->toISOString()
    ]);
});