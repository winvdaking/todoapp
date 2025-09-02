import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Fonction utilitaire pour combiner les classes CSS
 * 
 * Cette fonction combine clsx et tailwind-merge pour :
 * - Fusionner les classes CSS de manière intelligente
 * - Résoudre les conflits entre classes Tailwind
 * - Permettre une composition flexible des composants
 * 
 * @param inputs - Classes CSS à combiner
 * @returns String des classes CSS fusionnées
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
