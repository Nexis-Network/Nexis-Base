import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function trimFormattedBalance(balance: string, decimals: number): string {
  const [whole, fraction = ''] = balance.split('.');
  return `${whole}${fraction ? '.' : ''}${fraction.slice(0, decimals)}`;
}
