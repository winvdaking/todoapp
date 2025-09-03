"use client";

/**
 * Composant TaskItem - Représente une tâche individuelle
 * 
 * Ce composant affiche une tâche avec :
 * - Checkbox pour marquer comme terminée
 * - Titre de la tâche (éditable)
 * - Bouton de suppression
 * - Animations Framer Motion
 * - Support du drag & drop
 */

import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Trash2, Edit3, Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface Task {
    id: number;
    title: string;
    completed: boolean;
    order: number;
    created_at: string;
    updated_at: string;
}

interface TaskItemProps {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, title: string) => void;
    onReorder?: (tasks: Task[]) => void;
    isDragging?: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({
    task,
    onToggle,
    onDelete,
    onUpdate,
    isDragging = false
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (editTitle.trim()) {
            onUpdate(task.id, editTitle.trim());
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditTitle(task.title);
        setIsEditing(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "group relative flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md",
                isDragging && "opacity-50 scale-95",
                task.completed && "opacity-75"
            )}
        >
            {/* Checkbox */}
            <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggle(task.id)}
                className="shrink-0"
            />

            {/* Contenu de la tâche */}
            <div className="flex-1 min-w-0">
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <Input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onKeyDown={handleKeyPress}
                            onBlur={handleSave}
                            autoFocus
                            className="h-8 text-sm"
                        />
                        <div className="flex gap-1">
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleSave}
                                className="h-8 w-8 p-0"
                            >
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleCancel}
                                className="h-8 w-8 p-0"
                            >
                                ×
                            </Button>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        className={cn(
                            "text-sm font-medium transition-all",
                            task.completed && "line-through text-muted-foreground"
                        )}
                        initial={false}
                        animate={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            color: task.completed ? 'hsl(var(--muted-foreground))' : 'hsl(var(--foreground))'
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        {task.title}
                    </motion.div>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEdit}
                    className="h-8 w-8 p-0 hover:bg-accent"
                >
                    <Edit3 className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(task.id)}
                    className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Indicateur de statut */}
            {task.completed && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500"
                />
            )}
        </motion.div>
    );
};
