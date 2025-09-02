<?php

/**
 * Seeder pour les tâches de test
 * 
 * Ce seeder crée des tâches d'exemple pour tester l'application :
 * - Tâches avec différents statuts (complétées/non complétées)
 * - Ordre d'affichage varié pour tester le drag & drop
 * - Titres réalistes pour une démo convaincante
 */

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    /**
     * Exécuter le seeder
     *
     * @return void
     */
    public function run(): void
    {
        $tasks = [
            [
                'title' => 'Apprendre Next.js 14',
                'completed' => false,
                'order' => 1
            ],
            [
                'title' => 'Créer une API Laravel',
                'completed' => true,
                'order' => 2
            ],
            [
                'title' => 'Implémenter le drag & drop',
                'completed' => false,
                'order' => 3
            ],
            [
                'title' => 'Ajouter les animations Framer Motion',
                'completed' => false,
                'order' => 4
            ],
            [
                'title' => 'Configurer TailwindCSS',
                'completed' => true,
                'order' => 5
            ],
            [
                'title' => 'Tester l\'application complète',
                'completed' => false,
                'order' => 6
            ],
            [
                'title' => 'Déployer sur Vercel',
                'completed' => false,
                'order' => 7
            ],
            [
                'title' => 'Écrire la documentation',
                'completed' => false,
                'order' => 8
            ]
        ];

        foreach ($tasks as $taskData) {
            Task::create($taskData);
        }

        $this->command->info('Tâches de test créées avec succès !');
    }
}