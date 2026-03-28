import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatDate(date: string, options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        ...options,
    }).format(new Date(date));
}

export function formatTime(date: string): string {
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(new Date(date));
}

export function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
}

export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

export function getModeIcon(mode: string): string {
    const icons: Record<string, string> = {
        flight: '✈️',
        train: '🚄',
        bus: '🚌',
        ferry: '⛴️',
    };
    return icons[mode] || '🚀';
}

export function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        confirmed: 'text-success bg-success/10',
        pending: 'text-warning bg-warning/10',
        cancelled: 'text-error bg-error/10',
        completed: 'text-info bg-info/10',
        refunded: 'text-deep-lighter bg-deep-lighter/10',
    };
    return colors[status] || 'text-deep bg-soft-dark';
}

export function generateBookingRef(): string {
    return Array.from({ length: 8 }, () =>
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]
    ).join('');
}

export function daysUntil(date: string): number {
    const diff = new Date(date).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
