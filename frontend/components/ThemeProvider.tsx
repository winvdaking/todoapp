/**
 * Composant ThemeProvider - Gestion du thème clair/sombre
 * 
 * Ce composant :
 * - Détecte automatiquement le thème système
 * - Permet de basculer entre thème clair et sombre
 * - Persiste le choix de l'utilisateur
 * - Évite les problèmes d'hydratation SSR
 */

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
