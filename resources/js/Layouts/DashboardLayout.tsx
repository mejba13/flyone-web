import { type ReactNode } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Navbar } from '@/Components/layout/Navbar';
import { Toast } from '@/Components/ui/toast';
import { useFlash } from '@/Hooks/useFlash';
import { useAuth } from '@/Hooks/useAuth';
import {
    Plane, Ticket, User, Gift, Bell, Settings, LogOut, LayoutDashboard, ChevronRight,
} from 'lucide-react';

interface DashboardLayoutProps {
    children: ReactNode;
    title?: string;
}

const sidebarLinks = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/trips', label: 'My Trips', icon: Plane },
    { href: '/dashboard/tickets', label: 'Tickets', icon: Ticket },
    { href: '/dashboard/loyalty', label: 'Loyalty', icon: Gift },
    { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
    const { flash, visible, dismiss } = useFlash();
    const { user } = useAuth();
    const { url } = usePage();

    return (
        <>
            {title && <Head title={title} />}
            <div className="min-h-screen bg-soft">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <aside className="w-full lg:w-64 shrink-0">
                            <div className="bg-white rounded-2xl shadow-card p-4 sticky top-24">
                                <div className="flex items-center gap-3 p-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                                        {user?.name?.charAt(0)?.toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{user?.name}</p>
                                        <p className="text-xs text-deep-lighter capitalize">{user?.tier} Member</p>
                                    </div>
                                </div>
                                <nav className="space-y-1">
                                    {sidebarLinks.map((link) => {
                                        const isActive = url.startsWith(link.href);
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                                    isActive
                                                        ? 'bg-primary-50 text-primary-600'
                                                        : 'text-deep-lighter hover:bg-soft hover:text-deep'
                                                }`}
                                            >
                                                <link.icon className="h-4 w-4" />
                                                {link.label}
                                                {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>
                        </aside>
                        <motion.div
                            className="flex-1 min-w-0"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {children}
                        </motion.div>
                    </div>
                </div>
            </div>
            {flash.success && <Toast message={flash.success} type="success" visible={visible} onDismiss={dismiss} />}
            {flash.error && <Toast message={flash.error} type="error" visible={visible} onDismiss={dismiss} />}
        </>
    );
}
