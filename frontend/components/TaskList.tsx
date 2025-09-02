/**
 * Composant TaskList - Liste des tâches avec drag & drop
 * 
 * Ce composant gère :
 * - L'affichage de la liste des tâches
 * - Le drag & drop pour réorganiser l'ordre
 * - Les animations d'entrée/sortie des tâches
 * - L'intégration avec l'API backend
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { TaskItem, Task } from './TaskItem';
import { AddTask } from './AddTask';
import { TaskFilters, TaskFilter } from './TaskFilters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface TaskListProps {
    apiUrl: string;
}

export const TaskList: React.FC<TaskListProps> = ({ apiUrl }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [currentFilter, setCurrentFilter] = useState<TaskFilter>('all');
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Charger les tâches depuis l'API
    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`${apiUrl}/tasks?filter=${currentFilter}`);
            if (!response.ok) throw new Error('Erreur lors du chargement des tâches');

            const data = await response.json();
            if (data.success) {
                setTasks(data.data);
            } else {
                throw new Error(data.message || 'Erreur serveur');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue');
        } finally {
            setIsLoading(false);
        }
    };

    // Filtrer les tâches selon le filtre actuel
    useEffect(() => {
        let filtered: Task[];

        switch (currentFilter) {
            case 'active':
                filtered = tasks.filter(task => !task.completed);
                break;
            case 'completed':
                filtered = tasks.filter(task => task.completed);
                break;
            default:
                filtered = tasks;
        }

        setFilteredTasks(filtered);
    }, [tasks, currentFilter]);

    // Charger les tâches au montage et lors du changement de filtre
    useEffect(() => {
        fetchTasks();
    }, [currentFilter]);

    // Ajouter une nouvelle tâche
    const handleAddTask = async (title: string) => {
        try {
            setIsAdding(true);

            const response = await fetch(`${apiUrl}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            });

            if (!response.ok) throw new Error('Erreur lors de l\'ajout de la tâche');

            const data = await response.json();
            if (data.success) {
                await fetchTasks(); // Recharger la liste
            } else {
                throw new Error(data.message || 'Erreur serveur');
            }
        } catch (err) {
            throw err;
        } finally {
            setIsAdding(false);
        }
    };

    // Basculer le statut d'une tâche
    const handleToggleTask = async (id: number) => {
        try {
            const response = await fetch(`${apiUrl}/tasks/${id}/toggle`, {
                method: 'PUT'
            });

            if (!response.ok) throw new Error('Erreur lors de la modification');

            const data = await response.json();
            if (data.success) {
                setTasks(prev => prev.map(task =>
                    task.id === id ? { ...task, completed: !task.completed } : task
                ));
            }
        } catch (err) {
            console.error('Erreur lors du basculement:', err);
        }
    };

    // Supprimer une tâche
    const handleDeleteTask = async (id: number) => {
        try {
            const response = await fetch(`${apiUrl}/tasks/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Erreur lors de la suppression');

            const data = await response.json();
            if (data.success) {
                setTasks(prev => prev.filter(task => task.id !== id));
            }
        } catch (err) {
            console.error('Erreur lors de la suppression:', err);
        }
    };

    // Mettre à jour le titre d'une tâche
    const handleUpdateTask = async (id: number, title: string) => {
        try {
            const response = await fetch(`${apiUrl}/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            });

            if (!response.ok) throw new Error('Erreur lors de la modification');

            const data = await response.json();
            if (data.success) {
                setTasks(prev => prev.map(task =>
                    task.id === id ? { ...task, title } : task
                ));
            }
        } catch (err) {
            console.error('Erreur lors de la modification:', err);
        }
    };

    // Réorganiser l'ordre des tâches
    const handleReorder = async (newOrder: Task[]) => {
        try {
            const reorderData = newOrder.map((task, index) => ({
                id: task.id,
                order: index
            }));

            const response = await fetch(`${apiUrl}/tasks/reorder`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tasks: reorderData })
            });

            if (!response.ok) throw new Error('Erreur lors de la réorganisation');

            const data = await response.json();
            if (data.success) {
                setTasks(data.data);
            }
        } catch (err) {
            console.error('Erreur lors de la réorganisation:', err);
            // Restaurer l'ordre précédent en cas d'erreur
            await fetchTasks();
        }
    };

    // Calculer les compteurs
    const counts = {
        all: tasks.length,
        active: tasks.filter(task => !task.completed).length,
        completed: tasks.filter(task => task.completed).length
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-muted-foreground">Chargement des tâches...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* En-tête */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold text-foreground mb-2">
                    ✨ To-Do App
                </h1>
                <p className="text-muted-foreground">
                    Organisez vos tâches avec style et fluidité
                </p>
            </motion.div>

            {/* Formulaire d'ajout */}
            <Card>
                <CardContent className="pt-6">
                    <AddTask onAdd={handleAddTask} isLoading={isAdding} />
                </CardContent>
            </Card>

            {/* Filtres */}
            <TaskFilters
                currentFilter={currentFilter}
                onFilterChange={setCurrentFilter}
                counts={counts}
            />

            {/* Liste des tâches */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {currentFilter === 'all' && '📋 Toutes les tâches'}
                        {currentFilter === 'active' && '🚀 Tâches actives'}
                        {currentFilter === 'completed' && '✅ Tâches terminées'}
                        <span className="text-sm font-normal text-muted-foreground">
                            ({filteredTasks.length})
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {error ? (
                        <div className="flex items-center gap-2 text-destructive p-4 rounded-lg bg-destructive/10">
                            <AlertCircle className="h-5 w-5" />
                            <p>{error}</p>
                        </div>
                    ) : filteredTasks.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12 text-muted-foreground"
                        >
                            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">
                                {currentFilter === 'all' && 'Aucune tâche pour le moment'}
                                {currentFilter === 'active' && 'Aucune tâche active'}
                                {currentFilter === 'completed' && 'Aucune tâche terminée'}
                            </p>
                            <p className="text-sm">
                                {currentFilter === 'all' && 'Commencez par ajouter votre première tâche !'}
                                {currentFilter === 'active' && 'Toutes vos tâches sont terminées !'}
                                {currentFilter === 'completed' && 'Vous n\'avez pas encore terminé de tâche'}
                            </p>
                        </motion.div>
                    ) : (
                        <Reorder.Group
                            axis="y"
                            values={filteredTasks}
                            onReorder={handleReorder}
                            className="space-y-3"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredTasks.map((task) => (
                                    <Reorder.Item
                                        key={task.id}
                                        value={task}
                                        whileDrag={{ scale: 1.02, rotate: 2 }}
                                        className="cursor-grab active:cursor-grabbing"
                                    >
                                        <TaskItem
                                            task={task}
                                            onToggle={handleToggleTask}
                                            onDelete={handleDeleteTask}
                                            onUpdate={handleUpdateTask}
                                        />
                                    </Reorder.Item>
                                ))}
                            </AnimatePresence>
                        </Reorder.Group>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
