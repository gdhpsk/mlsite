import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Construct `className` strings conditionally, and merge
 * Tailwind CSS classes without style conflicts.
 * clsx: https://github.com/lukeed/clsx
 * tailwind-merge: https://github.com/dcastil/tailwind-merge
 * @param inputs
 * @returns className with conditionals resolved and styles merged
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
