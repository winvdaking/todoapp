"use client";

/**
 * Composant AddTask - Formulaire d'ajout de nouvelles tâches
 * 
 * Ce composant permet de :
 * - Saisir le titre d'une nouvelle tâche
 * - Valider et envoyer la tâche au backend
 * - Afficher des animations lors de l'ajout
 * - Gérer les états de chargement et d'erreur
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface AddTaskProps {
    onAdd: (title: string) => Promise<void>;
    isLoading?: boolean;
}

export const AddTask: React.FC<AddTaskProps> = ({ onAdd, isLoading = false }) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Veuillez saisir un titre pour la tâche');
            return;
        }

        if (title.length > 255) {
            setError('Le titre ne peut pas dépasser 255 caractères');
            return;
        }

        try {
            setError('');
            await onAdd(title.trim());
            setTitle('');
        } catch (err) {
            setError('Erreur lors de l\'ajout de la tâche');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        if (error) setError('');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
        >
            <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="flex-1">
                    <Input
                        type="text"
                        placeholder="Ajouter une nouvelle tâche..."
                        value={title}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className={cn(
                            "transition-all duration-200",
                            error && "border-destructive focus-visible:ring-destructive"
                        )}
                        maxLength={255}
                    />
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 text-sm text-destructive"
                        >
                            {error}
                        </motion.p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={isLoading || !title.trim()}
                    className="shrink-0 px-6"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Plus className="h-4 w-4" />
                    )}
                    <span className="ml-2 hidden sm:inline">Ajouter</span>
                </Button>
            </form>
        </motion.div>
    );
};
