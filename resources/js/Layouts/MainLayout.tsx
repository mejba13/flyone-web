import { type ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
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
                <AnimatePresence mode="wait">
                    <motion.main
                        className="flex-1"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        {children}
                    </motion.main>
                </AnimatePresence>
                {showFooter && <Footer />}
            </div>
            {flash.success && <Toast message={flash.success} type="success" visible={visible} onDismiss={dismiss} />}
            {flash.error && <Toast message={flash.error} type="error" visible={visible} onDismiss={dismiss} />}
        </>
    );
}
