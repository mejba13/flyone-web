import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/Lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
    {
        variants: {
            variant: {
                default: 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-sm hover:from-primary-500 hover:to-primary-600 hover:shadow-md',
                secondary: 'border-2 border-primary-300 text-primary-600 bg-transparent hover:bg-primary-50',
                ghost: 'text-deep hover:bg-soft-dark',
                destructive: 'bg-error text-white hover:bg-error/90',
                outline: 'border border-soft-dark text-deep hover:bg-soft-dark',
                link: 'text-primary-600 underline-offset-4 hover:underline',
                teal: 'bg-teal text-white hover:bg-teal-dark shadow-sm',
            },
            size: {
                default: 'h-10 px-5 py-2',
                sm: 'h-8 px-3 text-xs',
                lg: 'h-12 px-8 text-base',
                xl: 'h-14 px-10 text-lg',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
        if (asChild) {
            return (
                <Slot
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref}
                    {...props}
                >
                    {children}
                </Slot>
            );
        }
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={disabled || loading}
                {...props}
            >
                {loading && (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                )}
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
