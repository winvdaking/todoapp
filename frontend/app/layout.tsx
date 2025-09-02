/**
 * Layout principal de l'application Next.js
 * 
 * Ce layout configure :
 * - Les métadonnées de l'application
 * - Le support du dark mode
 * - Les styles globaux
 * - La structure HTML de base
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'To-Do App Moderne',
    description: 'Une application To-Do moderne construite avec Next.js, Laravel, TailwindCSS et Framer Motion',
    keywords: ['todo', 'nextjs', 'laravel', 'tailwindcss', 'framer-motion'],
    authors: [{ name: 'Développeur Fullstack' }],
    viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
