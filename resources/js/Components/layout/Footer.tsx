import { Link } from '@inertiajs/react';
import { Plane } from 'lucide-react';

const footerLinks = {
    Product: [
        { href: '/search', label: 'Search' },
        { href: '/destinations', label: 'Destinations' },
        { href: '/blog', label: 'Blog' },
        { href: '/chat', label: 'AI Assistant' },
    ],
    Company: [
        { href: '/about', label: 'About Us' },
        { href: '/careers', label: 'Careers' },
        { href: '/press', label: 'Press' },
        { href: '/contact', label: 'Contact' },
    ],
    Support: [
        { href: '/help', label: 'Help Center' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/refund-policy', label: 'Refund Policy' },
    ],
};

export function Footer() {
    return (
        <footer className="bg-deep text-white/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl flex items-center justify-center">
                                <Plane className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold text-white">Flyone</span>
                        </Link>
                        <p className="text-sm text-white/60 leading-relaxed">
                            Book flights, trains, buses, and ferries across Southeast Asia and beyond.
                        </p>
                    </div>
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-display font-semibold text-white mb-4">{category}</h4>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-white/60 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-white/40">© 2026 Flyone. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-white/40">Made with care for travelers everywhere</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
