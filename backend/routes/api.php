<?php

/**
 * Routes API pour l'application To-Do
 * 
 * Ce fichier définit toutes les routes API nécessaires pour :
 * - Gérer les tâches (CRUD complet)
 * - Réorganiser l'ordre des tâches
 * - Basculer le statut des tâches
 * - Filtrer les tâches (toutes/actives/terminées)
 */

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*
|--------------------------------------------------------------------------
| Task Routes
|--------------------------------------------------------------------------
|
| Routes pour la gestion des tâches
|
*/

// Récupérer toutes les tâches (avec filtres optionnels)
Route::get('/tasks', [TaskController::class, 'index']);

// Créer une nouvelle tâche
Route::post('/tasks', [TaskController::class, 'store']);

// Récupérer une tâche spécifique
Route::get('/tasks/{id}', [TaskController::class, 'show']);

// Mettre à jour une tâche
Route::put('/tasks/{id}', [TaskController::class, 'update']);

// Supprimer une tâche
Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);

// Basculer le statut d'une tâche
Route::put('/tasks/{id}/toggle', [TaskController::class, 'toggle']);

// Réorganiser l'ordre des tâches
Route::put('/tasks/reorder', [TaskController::class, 'reorder']);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
|
| Route pour vérifier que l'API fonctionne
|
*/

Route::get('/health', function () {
    return response()->json([
        'status' => 'OK',
        'message' => 'API To-Do fonctionne correctement',
        'timestamp' => now()->toISOString(),
        'version' => '1.0.0'
    ]);
});