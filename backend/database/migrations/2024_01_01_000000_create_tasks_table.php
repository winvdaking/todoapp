<?php

/**
 * Migration pour créer la table des tâches
 * 
 * Cette migration crée la structure de base pour stocker les tâches :
 * - id : Clé primaire auto-incrémentée
 * - title : Titre de la tâche (requis)
 * - completed : Statut de complétion (défaut: false)
 * - order : Ordre d'affichage pour le drag & drop (défaut: 0)
 * - Timestamps automatiques (created_at, updated_at)
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Exécuter la migration
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->boolean('completed')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();

            // Index pour optimiser les requêtes
            $table->index(['completed', 'order']);
            $table->index('order');
        });
    }

    /**
     * Annuler la migration
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};