import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { useAuth } from '@/Hooks/useAuth';
import { Button } from '@/Components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { getInitials } from '@/Lib/utils';
import {
    Plane, Menu, X, Search, Bell, MessageCircle,
    LayoutDashboard, User, Gift, Settings, LogOut,
} from 'lucide-react';

export function Navbar() {
    const { user, isAuthenticated } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-soft-dark/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                                <Plane className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold text-deep">Flyone</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-1">
                            {[
                                { href: '/search', label: 'Search' },
                                { href: '/destinations', label: 'Destinations' },
                                { href: '/blog', label: 'Blog' },
                                { href: '/chat', label: 'AI Chat' },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-3 py-2 text-sm font-medium text-deep-lighter hover:text-deep rounded-lg hover:bg-soft transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <>
                                <Link href="/dashboard/notifications" className="relative p-2 text-deep-lighter hover:text-deep transition-colors">
                                    <Bell className="h-5 w-5" />
                                </Link>
                                <Link href="/chat" className="p-2 text-deep-lighter hover:text-deep transition-colors hidden sm:block">
                                    <MessageCircle className="h-5 w-5" />
                                </Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center gap-2 p-1 rounded-full hover:bg-soft transition-colors">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={user?.avatar} />
                                                <AvatarFallback>{getInitials(user?.name || '')}</AvatarFallback>
                                            </Avatar>
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>
                                            <p className="font-medium">{user?.name}</p>
                                            <p className="text-xs text-deep-lighter font-normal">{user?.email}</p>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard" className="cursor-pointer"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard/profile" className="cursor-pointer"><User className="mr-2 h-4 w-4" />Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard/loyalty" className="cursor-pointer"><Gift className="mr-2 h-4 w-4" />Loyalty</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-error cursor-pointer"
                                            onClick={() => router.post('/logout')}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />Sign out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/login">Sign in</Link>
                                </Button>
                                <Button size="sm" asChild>
                                    <Link href="/register">Get started</Link>
                                </Button>
                            </div>
                        )}

                        <button
                            className="md:hidden p-2 text-deep-lighter hover:text-deep"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {mobileOpen && (
                    <div className="md:hidden py-4 border-t border-soft-dark/50">
                        <nav className="flex flex-col gap-1">
                            {[
                                { href: '/search', label: 'Search' },
                                { href: '/destinations', label: 'Destinations' },
                                { href: '/blog', label: 'Blog' },
                                { href: '/chat', label: 'AI Chat' },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-3 py-2.5 text-sm font-medium text-deep-lighter hover:text-deep rounded-lg hover:bg-soft transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
