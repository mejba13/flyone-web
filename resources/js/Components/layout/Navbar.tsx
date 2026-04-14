import { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { useAuth } from '@/Hooks/useAuth';
import { Button } from '@/Components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { getInitials } from '@/Lib/utils';
import {
    Menu, X, Bell, Sparkles,
    LayoutDashboard, User, Gift, LogOut, Map, Plane,
} from 'lucide-react';

const navLinks = [
    { href: '/search', label: 'Flights' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
];

const mobileLinks = [
    { href: '/search', label: 'Search Flights', icon: Plane },
    { href: '/destinations', label: 'Destinations', icon: Map },
    { href: '/blog', label: 'Travel Blog' },
    { href: '/contact', label: 'Contact Us' },
];

export function Navbar() {
    const { user, isAuthenticated } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const page = usePage();
    const isHome = page.url === '/';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (href: string) => page.url.startsWith(href);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
                scrolled
                    ? 'bg-[#0c0b18]/85 backdrop-blur-2xl border-b border-white/[0.04]'
                    : isHome
                        ? 'bg-transparent'
                        : 'bg-[#0c0b18]/85 backdrop-blur-2xl border-b border-white/[0.04]'
            }`}
        >
            <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
                <div className="flex items-center justify-between h-[72px]">
                    {/* Logo + Nav */}
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-primary-400/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="relative w-11 h-11 rounded-[14px] bg-gradient-to-br from-primary-500/30 via-[#1e1a35] to-[#14122a] border border-primary-400/20 flex items-center justify-center shadow-[0_4px_20px_rgba(124,58,237,0.25)] group-hover:border-primary-400/40 group-hover:shadow-[0_4px_28px_rgba(124,58,237,0.35)] transition-all duration-500 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-400/15 via-transparent to-teal/10" />
                                    <svg viewBox="0 0 32 32" className="relative w-7 h-7" fill="none">
                                        <text x="5" y="25" style={{ fontSize: '24px', fontWeight: 800, fontStyle: 'italic', fontFamily: 'Playfair Display, serif' }} fill="url(#navLogoG)">F</text>
                                        <path d="M17 9 Q26 6 29 15" stroke="url(#navPathG)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                                        <circle cx="29" cy="15" r="1.5" fill="#5BCFCF" />
                                        <defs>
                                            <linearGradient id="navLogoG" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#ffffff" />
                                                <stop offset="100%" stopColor="#D6CCFF" />
                                            </linearGradient>
                                            <linearGradient id="navPathG" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.5" />
                                                <stop offset="100%" stopColor="#5BCFCF" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[21px] font-display font-bold text-white tracking-[-0.03em] leading-none">
                                    Flyone
                                </span>
                                <span className="text-[8.5px] font-semibold tracking-[0.2em] uppercase text-primary-300/40 mt-0.5">Travel reimagined</span>
                            </div>
                        </Link>

                        {/* Primary nav */}
                        <nav className="hidden md:flex items-center">
                            <div className="flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.05] rounded-full px-1.5 py-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`px-4 py-1.5 text-[14px] font-medium rounded-full transition-all duration-300 ${
                                            isActive(link.href)
                                                ? 'bg-white/[0.08] text-white'
                                                : 'text-white/50 hover:text-white hover:bg-white/[0.07]'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </nav>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        {isAuthenticated ? (
                            <>
                                {/* AI Chat button */}
                                <Link
                                    href="/chat"
                                    className={`hidden sm:flex items-center gap-2 h-9 px-4 rounded-full text-[13px] font-medium transition-all duration-300 ${
                                        isActive('/chat')
                                            ? 'bg-primary-500/15 text-primary-300 border border-primary-500/20'
                                            : 'text-white/40 hover:text-white/70 hover:bg-white/[0.06]'
                                    }`}
                                >
                                    <Sparkles className="h-3.5 w-3.5" />
                                    AI Chat
                                </Link>

                                <Link href="/dashboard/notifications" className="relative p-2.5 text-white/40 hover:text-white hover:bg-white/[0.06] rounded-xl transition-all duration-300">
                                    <Bell className="h-[18px] w-[18px]" />
                                </Link>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center gap-2 p-1 rounded-full hover:bg-white/[0.06] transition-colors">
                                            <Avatar className="h-8 w-8 ring-2 ring-white/10">
                                                <AvatarImage src={user?.avatar} />
                                                <AvatarFallback className="text-[11px] font-semibold bg-primary-500/20 text-primary-300">{getInitials(user?.name || '')}</AvatarFallback>
                                            </Avatar>
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>
                                            <p className="font-medium">{user?.name}</p>
                                            <p className="text-xs text-[#999] font-normal">{user?.email}</p>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild><Link href="/dashboard" className="cursor-pointer"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link></DropdownMenuItem>
                                        <DropdownMenuItem asChild><Link href="/dashboard/trips" className="cursor-pointer"><Map className="mr-2 h-4 w-4" />My Trips</Link></DropdownMenuItem>
                                        <DropdownMenuItem asChild><Link href="/dashboard/profile" className="cursor-pointer"><User className="mr-2 h-4 w-4" />Profile</Link></DropdownMenuItem>
                                        <DropdownMenuItem asChild><Link href="/dashboard/loyalty" className="cursor-pointer"><Gift className="mr-2 h-4 w-4" />Loyalty & Rewards</Link></DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-error cursor-pointer" onClick={() => router.post('/logout')}>
                                            <LogOut className="mr-2 h-4 w-4" />Sign out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="text-[13px] h-9 px-4 font-medium rounded-full text-white/55 hover:text-white hover:bg-white/[0.07] transition-all duration-300" asChild>
                                    <Link href="/login">Sign in</Link>
                                </Button>
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full blur-sm opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                                    <Button size="sm" className="relative h-9 px-5 text-[13px] font-semibold rounded-full bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-none hover:from-primary-400 hover:to-primary-500 transition-all duration-300" asChild>
                                        <Link href="/register">Get started</Link>
                                    </Button>
                                </div>
                            </div>
                        )}

                        <button className="md:hidden p-2 text-white/50 hover:text-white rounded-lg" onClick={() => setMobileOpen(!mobileOpen)}>
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden py-4 border-t border-white/[0.06]">
                        <nav className="flex flex-col gap-0.5">
                            {mobileLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-3 px-4 py-3 text-[15px] font-medium rounded-xl transition-all ${
                                        isActive(link.href)
                                            ? 'text-white bg-white/[0.06]'
                                            : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                                    }`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.icon && <link.icon className="h-4 w-4 text-primary-400/60" />}
                                    {link.label}
                                </Link>
                            ))}

                            {isAuthenticated && (
                                <>
                                    <div className="h-[1px] bg-white/[0.05] my-2" />
                                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-[15px] font-medium text-white/50 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all" onClick={() => setMobileOpen(false)}>
                                        <LayoutDashboard className="h-4 w-4 text-primary-400/60" />
                                        Dashboard
                                    </Link>
                                    <Link href="/dashboard/trips" className="flex items-center gap-3 px-4 py-3 text-[15px] font-medium text-white/50 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all" onClick={() => setMobileOpen(false)}>
                                        <Map className="h-4 w-4 text-primary-400/60" />
                                        My Trips
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
