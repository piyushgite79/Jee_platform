import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function getRandomMotivationalMessage(): string {
  const messages = [
    "You're making great progress! Keep pushing forward! 🚀",
    "Every practice test brings you closer to success! 📚",
    "Small steps lead to big achievements! 🎯",
    "Your dedication today shapes your tomorrow! ⭐",
    "Keep going! You're getting better every day! 💪",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}