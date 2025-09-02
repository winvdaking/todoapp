<?php

/**
 * Modèle Task - Gère les tâches de l'application To-Do
 * 
 * Ce modèle représente une tâche avec ses propriétés de base :
 * - id : Identifiant unique de la tâche
 * - title : Titre/description de la tâche
 * - completed : Statut de complétion (true/false)
 * - order : Ordre d'affichage pour le drag & drop
 * - created_at/updated_at : Timestamps automatiques
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    /**
     * Les attributs qui sont assignables en masse
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'completed',
        'order'
    ];

    /**
     * Les attributs qui doivent être convertis en types natifs
     *
     * @var array<string, string>
     */
    protected $casts = [
        'completed' => 'boolean',
        'order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Les attributs par défaut pour une nouvelle tâche
     *
     * @var array<string, mixed>
     */
    protected $attributes = [
        'completed' => false,
        'order' => 0,
    ];

    /**
     * Scope pour récupérer les tâches dans l'ordre
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }

    /**
     * Scope pour récupérer les tâches actives (non terminées)
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('completed', false);
    }

    /**
     * Scope pour récupérer les tâches terminées
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCompleted($query)
    {
        return $query->where('completed', true);
    }

    /**
     * Marquer la tâche comme terminée
     *
     * @return bool
     */
    public function markAsCompleted(): bool
    {
        return $this->update(['completed' => true]);
    }

    /**
     * Marquer la tâche comme non terminée
     *
     * @return bool
     */
    public function markAsIncomplete(): bool
    {
        return $this->update(['completed' => false]);
    }

    /**
     * Basculer le statut de la tâche
     *
     * @return bool
     */
    public function toggleStatus(): bool
    {
        return $this->update(['completed' => !$this->completed]);
    }
}