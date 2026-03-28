import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/Lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
    {
        variants: {
            variant: {
                default: 'bg-primary-100 text-primary-600',
                teal: 'bg-teal/10 text-teal-dark',
                amber: 'bg-warning/10 text-warning',
                success: 'bg-success/10 text-success',
                error: 'bg-error/10 text-error',
                outline: 'border border-soft-dark text-deep-lighter',
                premium: 'bg-gradient-to-r from-primary-300 to-primary-400 text-white',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
