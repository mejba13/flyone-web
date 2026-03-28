import { type ReactNode } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

interface AuthLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
    return (
        <>
            {title && <Head title={title} />}
            <div className="min-h-screen bg-soft flex">
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 to-primary-600 p-12 flex-col justify-between">
                    <Link href="/" className="flex items-center gap-2 text-white">
                        <Plane className="h-8 w-8" />
                        <span className="text-2xl font-display font-bold">Flyone</span>
                    </Link>
                    <div>
                        <h1 className="text-4xl font-display font-bold text-white mb-4">
                            Travel the world with confidence
                        </h1>
                        <p className="text-primary-100 text-lg">
                            Book flights, trains, buses, and ferries all in one place. Join millions of happy travelers.
                        </p>
                    </div>
                    <p className="text-primary-200 text-sm">© 2026 Flyone. All rights reserved.</p>
                </div>
                <div className="flex-1 flex items-center justify-center p-8">
                    <motion.div
                        className="w-full max-w-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                            <Plane className="h-8 w-8 text-primary-500" />
                            <span className="text-2xl font-display font-bold text-deep">Flyone</span>
                        </div>
                        {children}
                    </motion.div>
                </div>
            </div>
        </>
    );
}
