import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { PageProps } from '@/Types';

export function useFlash() {
    const { flash } = usePage<PageProps>().props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (flash.success || flash.error) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return { flash, visible, dismiss: () => setVisible(false) };
}
