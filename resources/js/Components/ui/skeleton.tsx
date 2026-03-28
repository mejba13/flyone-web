import { cn } from '@/Lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('animate-pulse rounded-xl bg-soft-dark', className)}
            {...props}
        />
    );
}

export { Skeleton };
