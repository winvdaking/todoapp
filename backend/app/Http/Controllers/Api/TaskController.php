<?php

/**
 * Contrôleur API pour la gestion des tâches
 * 
 * Ce contrôleur gère toutes les opérations CRUD sur les tâches :
 * - GET /api/tasks : Récupérer toutes les tâches
 * - POST /api/tasks : Créer une nouvelle tâche
 * - PUT /api/tasks/{id} : Modifier une tâche existante
 * - DELETE /api/tasks/{id} : Supprimer une tâche
 * - PUT /api/tasks/reorder : Réorganiser l'ordre des tâches
 */

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    /**
     * Récupérer toutes les tâches ordonnées
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $filter = $request->query('filter', 'all');

            $query = Task::query();

            // Appliquer les filtres
            switch ($filter) {
                case 'active':
                    $query->active();
                    break;
                case 'completed':
                    $query->completed();
                    break;
                default:
                    // 'all' - pas de filtre
                    break;
            }

            $tasks = $query->ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $tasks,
                'message' => 'Tâches récupérées avec succès'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des tâches',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Créer une nouvelle tâche
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255|min:1',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Données invalides',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Déterminer l'ordre de la nouvelle tâche
            $maxOrder = Task::max('order') ?? 0;
            $newOrder = $maxOrder + 1;

            $task = Task::create([
                'title' => $request->title,
                'order' => $newOrder,
                'completed' => false
            ]);

            return response()->json([
                'success' => true,
                'data' => $task,
                'message' => 'Tâche créée avec succès'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de la tâche',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Récupérer une tâche spécifique
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $task = Task::find($id);

            if (!$task) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tâche non trouvée'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $task,
                'message' => 'Tâche récupérée avec succès'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération de la tâche',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour une tâche
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $task = Task::find($id);

            if (!$task) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tâche non trouvée'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|required|string|max:255|min:1',
                'completed' => 'sometimes|boolean',
                'order' => 'sometimes|integer|min:0'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Données invalides',
                    'errors' => $validator->errors()
                ], 422);
            }

            $task->update($request->only(['title', 'completed', 'order']));

            return response()->json([
                'success' => true,
                'data' => $task,
                'message' => 'Tâche mise à jour avec succès'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour de la tâche',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer une tâche
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $task = Task::find($id);

            if (!$task) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tâche non trouvée'
                ], 404);
            }

            $task->delete();

            return response()->json([
                'success' => true,
                'message' => 'Tâche supprimée avec succès'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de la tâche',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Réorganiser l'ordre des tâches
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function reorder(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'tasks' => 'required|array',
                'tasks.*.id' => 'required|integer|exists:tasks,id',
                'tasks.*.order' => 'required|integer|min:0'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Données invalides',
                    'errors' => $validator->errors()
                ], 422);
            }

            foreach ($request->tasks as $taskData) {
                Task::where('id', $taskData['id'])
                    ->update(['order' => $taskData['order']]);
            }

            $tasks = Task::ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $tasks,
                'message' => 'Ordre des tâches mis à jour avec succès'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la réorganisation des tâches',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Basculer le statut d'une tâche
     *
     * @param int $id
     * @return JsonResponse
     */
    public function toggle(int $id): JsonResponse
    {
        try {
            $task = Task::find($id);

            if (!$task) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tâche non trouvée'
                ], 404);
            }

            $task->toggleStatus();

            return response()->json([
                'success' => true,
                'data' => $task,
                'message' => 'Statut de la tâche basculé avec succès'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du basculement du statut',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}