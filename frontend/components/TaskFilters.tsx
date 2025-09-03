"use client";

/**
 * Composant TaskFilters - Filtres pour les tâches
 * 
 * Ce composant permet de :
 * - Filtrer les tâches (toutes, actives, terminées)
 * - Afficher le nombre de tâches par catégorie
 * - Basculer entre les différents filtres
 * - Animer les transitions entre filtres
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type TaskFilter = 'all' | 'active' | 'completed';

interface TaskFiltersProps {
    currentFilter: TaskFilter;
    onFilterChange: (filter: TaskFilter) => void;
    counts: {
        all: number;
        active: number;
        completed: number;
    };
}

const filterOptions: { value: TaskFilter; label: string; color: string }[] = [
    { value: 'all', label: 'Toutes', color: 'bg-blue-500' },
    { value: 'active', label: 'Actives', color: 'bg-green-500' },
    { value: 'completed', label: 'Terminées', color: 'bg-purple-500' }
];

export const TaskFilters: React.FC<TaskFiltersProps> = ({
    currentFilter,
    onFilterChange,
    counts
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
            {filterOptions.map((option) => (
                <motion.div
                    key={option.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        variant={currentFilter === option.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onFilterChange(option.value)}
                        className={cn(
                            "relative min-w-[80px] transition-all duration-200",
                            currentFilter === option.value && "shadow-md"
                        )}
                    >
                        <span className="flex items-center gap-2">
                            <div className={cn("w-2 h-2 rounded-full", option.color)} />
                            {option.label}
                        </span>

                        {/* Badge avec le nombre de tâches */}
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className={cn(
                                "ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full",
                                currentFilter === option.value
                                    ? "bg-primary-foreground text-primary"
                                    : "bg-muted text-muted-foreground"
                            )}
                        >
                            {counts[option.value]}
                        </motion.span>
                    </Button>
                </motion.div>
            ))}
        </motion.div>
    );
};
