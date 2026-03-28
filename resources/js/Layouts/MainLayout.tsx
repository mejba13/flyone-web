import { type ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import { Navbar } from '@/Components/layout/Navbar';
import { Footer } from '@/Components/layout/Footer';
import { Toast } from '@/Components/ui/toast';
import { useFlash } from '@/Hooks/useFlash';

interface MainLayoutProps {
    children: ReactNode;
    title?: string;
    showFooter?: boolean;
}

export default function MainLayout({ children, title, showFooter = true }: MainLayoutProps) {
    const { flash, visible, dismiss } = useFlash();

    return (
        <>
            {title && <Head title={title} />}
            <div className="min-h-screen flex flex-col bg-soft">
                <Navbar />
                <main className="flex-1">
                    {children}
                </main>
                {showFooter && <Footer />}
            </div>
            {flash.success && <Toast message={flash.success} type="success" visible={visible} onDismiss={dismiss} />}
            {flash.error && <Toast message={flash.error} type="error" visible={visible} onDismiss={dismiss} />}
        </>
    );
}
