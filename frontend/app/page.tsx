/**
 * Page principale de l'application To-Do
 * 
 * Cette page affiche :
 * - Le composant TaskList principal
 * - La configuration de l'URL de l'API
 * - Le support du dark mode
 * - La structure de base de l'application
 */

import { TaskList } from '@/components/TaskList';

export default function HomePage() {
    // URL de l'API Laravel (configurable via variables d'environnement)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

    return (
        <main className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
            <TaskList apiUrl={apiUrl} />
        </main>
    );
}
