import { usePage } from '@inertiajs/react';
import type { PageProps } from '@/Types';

export function useAuth() {
    const { auth } = usePage<PageProps>().props;
    return {
        user: auth.user,
        isAuthenticated: !!auth.user,
        isAdmin: auth.user?.roles?.includes('admin') || auth.user?.roles?.includes('super_admin'),
        isProvider: auth.user?.roles?.includes('provider'),
    };
}
