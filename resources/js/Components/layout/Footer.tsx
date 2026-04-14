import { Link } from '@inertiajs/react';
import { MapPin, Mail, ArrowRight } from 'lucide-react';

const footerLinks = {
    Product: [
        { href: '/search', label: 'Search Flights' },
        { href: '/search?mode=train', label: 'Train Tickets' },
        { href: '/search?mode=bus', label: 'Bus Routes' },
        { href: '/search?mode=ferry', label: 'Ferry Booking' },
        { href: '/destinations', label: 'Destinations' },
        { href: '/chat', label: 'AI Travel Assistant' },
    ],
    Company: [
        { href: '/about', label: 'About Flyone' },
        { href: '/blog', label: 'Travel Blog' },
        { href: '/careers', label: 'Careers' },
        { href: '/press', label: 'Press & Media' },
        { href: '/contact', label: 'Contact Us' },
    ],
    Support: [
        { href: '/help', label: 'Help Center' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/refund-policy', label: 'Refund Policy' },
        { href: '/accessibility', label: 'Accessibility' },
    ],
};

const destinations = [
    'Bangkok', 'Singapore', 'Bali', 'Kuala Lumpur',
    'Ho Chi Minh City', 'Phuket', 'Chiang Mai', 'Manila',
];

export function Footer() {
    return (
        <footer className="bg-[#08080f]">
            {/* Newsletter */}
            <div className="border-y border-white/[0.06]">
                <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12 md:py-14">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-white font-display font-bold text-[22px]" style={{ letterSpacing: '-0.2px' }}>
                                Get exclusive travel deals
                            </h3>
                            <p className="text-white/40 text-[15px] mt-2">Subscribe for flash sales, destination guides, and insider tips.</p>
                        </div>
                        <div className="flex w-full md:w-auto gap-2">
                            <div className="relative flex-1 md:w-80">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full h-12 bg-white/[0.06] border border-white/[0.08] rounded-xl pl-11 pr-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary-400/30 transition-all"
                                />
                            </div>
                            <button className="h-12 px-6 bg-gradient-to-r from-primary-500 to-primary-400 text-white font-semibold text-[14px] rounded-xl shadow-[0_4px_16px_rgba(124,58,237,0.25)] hover:shadow-[0_6px_24px_rgba(124,58,237,0.35)] transition-all flex items-center gap-2 shrink-0">
                                Subscribe
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main footer */}
            <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-16 pb-10">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-10 lg:gap-14">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2.5 mb-6">
                            <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-primary-500/30 via-[#1e1a35] to-[#14122a] border border-primary-400/20 flex items-center justify-center shadow-[0_4px_20px_rgba(124,58,237,0.2)] overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/15 via-transparent to-teal/10" />
                                <svg viewBox="0 0 32 32" className="relative w-7 h-7" fill="none">
                                    <text x="5" y="25" style={{ fontSize: '24px', fontWeight: 800, fontStyle: 'italic', fontFamily: 'Playfair Display, serif' }} fill="url(#ftLogoG)">F</text>
                                    <path d="M17 9 Q26 6 29 15" stroke="url(#ftPathG)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                                    <circle cx="29" cy="15" r="1.5" fill="#5BCFCF" />
                                    <defs>
                                        <linearGradient id="ftLogoG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#D6CCFF" /></linearGradient>
                                        <linearGradient id="ftPathG" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#A78BFA" stopOpacity="0.5" /><stop offset="100%" stopColor="#5BCFCF" /></linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[21px] font-display font-bold text-white tracking-[-0.03em] leading-none">Flyone</span>
                                <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-primary-300/50 mt-1">Travel reimagined</span>
                            </div>
                        </Link>
                        <p className="text-white/45 text-[14px] leading-[1.7] max-w-[300px]">
                            Southeast Asia's multi-modal travel platform. Compare and book flights, trains, buses, and ferries in one search.
                        </p>

                        <div className="mt-7 space-y-3">
                            <a href="mailto:hello@flyone.com" className="flex items-center gap-3 text-[14px] text-white/40 hover:text-primary-400 transition-colors">
                                <Mail className="h-4 w-4 text-primary-400/60" />
                                hello@flyone.com
                            </a>
                            <span className="flex items-center gap-3 text-[14px] text-white/40">
                                <MapPin className="h-4 w-4 text-primary-400/60" />
                                Singapore &middot; Bangkok &middot; Jakarta
                            </span>
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-display font-semibold text-white/70 text-[13px] uppercase tracking-[0.08em] mb-5">{category}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-[14px] text-white/40 hover:text-white/70 transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Destinations */}
                    <div className="col-span-2 md:col-span-1 hidden lg:block">
                        <h4 className="font-display font-semibold text-white/70 text-[13px] uppercase tracking-[0.08em] mb-5">Top Destinations</h4>
                        <ul className="space-y-3">
                            {destinations.map((dest) => (
                                <li key={dest}>
                                    <Link
                                        href={`/destinations/${dest.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="text-[14px] text-white/40 hover:text-white/70 transition-colors duration-200"
                                    >
                                        {dest}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Payment badges */}
                <div className="mt-14 pt-8 border-t border-white/[0.06]">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                        <div className="flex items-center gap-4">
                            <span className="text-[12px] text-white/30 uppercase tracking-wider font-medium">We accept</span>
                            <div className="flex items-center gap-2">
                                {['Visa', 'Mastercard', 'AMEX', 'GoPay'].map((method) => (
                                    <span key={method} className="px-3 py-1 bg-white/[0.05] rounded-md text-[11px] font-semibold text-white/40 border border-white/[0.07]">
                                        {method}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1.5 bg-white/[0.05] rounded-lg text-[11px] font-medium text-white/40 border border-white/[0.07] flex items-center gap-2">
                                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="m7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                SSL Secured
                            </span>
                            <span className="px-3 py-1.5 bg-white/[0.05] rounded-lg text-[11px] font-medium text-white/40 border border-white/[0.07]">
                                PCI DSS Certified
                            </span>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-[13px] text-white/30">
                        &copy; {new Date().getFullYear()} Flyone. All rights reserved. Built by{' '}
                        <a href="https://ramlit.com" className="text-white/45 hover:text-primary-400 transition-colors" target="_blank" rel="noopener noreferrer">
                            Ramlit Limited
                        </a>
                    </p>
                    <span className="text-[12px] text-white/20">Made with care for travelers everywhere</span>
                </div>
            </div>
        </footer>
    );
}
