import * as React from 'react';
import { cn } from '@/Lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, icon, ...props }, ref) => {
        return (
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-deep-lighter">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        'flex h-11 w-full rounded-xl border bg-white px-4 py-2 text-sm transition-colors',
                        'placeholder:text-deep-lighter/60',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:border-primary-300',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        icon && 'pl-10',
                        error ? 'border-error focus-visible:ring-error' : 'border-soft-dark',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <p className="mt-1 text-xs text-error">{error}</p>}
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
