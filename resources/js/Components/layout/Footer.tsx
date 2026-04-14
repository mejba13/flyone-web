import { Link } from '@inertiajs/react';
import { Plane, MapPin, Mail, ArrowRight } from 'lucide-react';

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
        <footer>
            {/* Newsletter bar */}
            <div className="bg-[#222]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-white font-display font-bold text-xl" style={{ letterSpacing: '-0.18px' }}>
                                Get exclusive travel deals
                            </h3>
                            <p className="text-white/50 text-sm mt-1">Subscribe for flash sales, destination guides, and insider tips.</p>
                        </div>
                        <div className="flex w-full md:w-auto gap-2">
                            <div className="relative flex-1 md:w-72">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full h-12 bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                                />
                            </div>
                            <button className="h-12 px-6 bg-white text-[#222] font-medium text-sm rounded-xl hover:bg-white/90 transition-colors flex items-center gap-1.5 shrink-0">
                                Subscribe
                                <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main footer */}
            <div className="bg-[#f7f7f7] border-t border-[#f2f2f2]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
                        {/* Brand column */}
                        <div className="col-span-2">
                            <Link href="/" className="flex items-center gap-2.5 mb-5">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                                    <Plane className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-2xl font-display font-bold text-[#222] tracking-tight">Flyone</span>
                            </Link>
                            <p className="text-[#6a6a6a] text-sm leading-relaxed max-w-xs">
                                Southeast Asia's multi-modal travel platform. Compare and book flights, trains, buses, and ferries in one search.
                            </p>

                            <div className="mt-6 space-y-2.5">
                                <a href="mailto:hello@flyone.com" className="flex items-center gap-2.5 text-sm text-[#6a6a6a] hover:text-[#222] transition-colors">
                                    <Mail className="h-4 w-4 text-primary-400" />
                                    hello@flyone.com
                                </a>
                                <span className="flex items-center gap-2.5 text-sm text-[#6a6a6a]">
                                    <MapPin className="h-4 w-4 text-primary-400" />
                                    Singapore &middot; Bangkok &middot; Jakarta
                                </span>
                            </div>
                        </div>

                        {/* Link columns */}
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <h4 className="font-display font-semibold text-[#222] text-sm uppercase tracking-wider mb-4">{category}</h4>
                                <ul className="space-y-2.5">
                                    {links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-[#6a6a6a] hover:text-[#222] transition-colors duration-200"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Destinations column */}
                        <div className="col-span-2 md:col-span-1 hidden lg:block">
                            <h4 className="font-display font-semibold text-[#222] text-sm uppercase tracking-wider mb-4">Top Destinations</h4>
                            <ul className="space-y-2.5">
                                {destinations.map((dest) => (
                                    <li key={dest}>
                                        <Link
                                            href={`/destinations/${dest.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="text-sm text-[#6a6a6a] hover:text-[#222] transition-colors duration-200"
                                        >
                                            {dest}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Payment & trust */}
                    <div className="mt-12 pt-8 border-t border-[#e8e8e8]">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-[#6a6a6a] uppercase tracking-wider">We accept</span>
                                <div className="flex items-center gap-2">
                                    {['Visa', 'Mastercard', 'AMEX', 'GoPay'].map((method) => (
                                        <span key={method} className="px-2.5 py-1 bg-white rounded-md text-[10px] font-semibold text-[#6a6a6a] border border-[#e8e8e8]">
                                            {method}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1.5 bg-white rounded-lg text-[10px] font-medium text-[#6a6a6a] border border-[#e8e8e8] flex items-center gap-1.5">
                                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="m7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                    SSL Secured
                                </span>
                                <span className="px-3 py-1.5 bg-white rounded-lg text-[10px] font-medium text-[#6a6a6a] border border-[#e8e8e8]">
                                    PCI DSS Certified
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="mt-8 pt-6 border-t border-[#e8e8e8] flex flex-col sm:flex-row justify-between items-center gap-3">
                        <p className="text-xs text-[#6a6a6a]">
                            &copy; {new Date().getFullYear()} Flyone. All rights reserved. Built by{' '}
                            <a href="https://ramlit.com" className="text-[#222] hover:text-primary-600 transition-colors" target="_blank" rel="noopener noreferrer">
                                Ramlit Limited
                            </a>
                        </p>
                        <span className="text-xs text-[#c1c1c1]">Made with care for travelers everywhere</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
