import * as React from 'react';
import { cn } from '@/Lib/utils';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    visible: boolean;
    onDismiss: () => void;
}

export function Toast({ message, type, visible, onDismiss }: ToastProps) {
    if (!visible || !message) return null;

    return (
        <div className="fixed top-4 right-4 z-[100] animate-slide-up">
            <div className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg',
                type === 'success' ? 'bg-success text-white' : 'bg-error text-white'
            )}>
                {type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                <p className="text-sm font-medium">{message}</p>
                <button onClick={onDismiss} className="ml-2 opacity-70 hover:opacity-100">
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
