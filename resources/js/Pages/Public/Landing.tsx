import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Navbar } from '@/Components/layout/Navbar';
import { Footer } from '@/Components/layout/Footer';
import { Toast } from '@/Components/ui/toast';
import { useFlash } from '@/Hooks/useFlash';
import { Button } from '@/Components/ui/button';
import { useSearchStore } from '@/Stores/searchStore';
import { formatCurrency, formatDate, formatDuration } from '@/Lib/utils';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
    Plane, Train, Bus, Ship, Search, ArrowRight,
    MapPin, TrendingUp, Shield,
    Calendar, Star, Globe, Zap, Heart,
    CheckCircle, Award, Sparkles,
} from 'lucide-react';
import type { Route, Destination } from '@/Types';

interface Props {
    trending: Destination[];
    featured: Destination[];
    flashDeals: Route[];
    stats: { routes: number; destinations: number; bookings: number; users: number };
}

const transportModes = [
    { icon: Plane, label: 'Flights', mode: 'flight', bg: 'bg-primary-50', text: 'text-primary-600', desc: 'Compare 100+ airlines' },
    { icon: Train, label: 'Trains', mode: 'train', bg: 'bg-teal/8', text: 'text-teal-dark', desc: 'Scenic rail journeys' },
    { icon: Bus, label: 'Buses', mode: 'bus', bg: 'bg-amber-50', text: 'text-amber-600', desc: 'Budget-friendly routes' },
    { icon: Ship, label: 'Ferries', mode: 'ferry', bg: 'bg-cyan-50', text: 'text-cyan-600', desc: 'Island-hop with ease' },
];

const trustSignals = [
    { icon: Shield, label: 'Secure payments', desc: 'PCI DSS Level 1 certified' },
    { icon: Zap, label: 'Instant confirmation', desc: 'Real-time booking guarantee' },
    { icon: Heart, label: 'Best price promise', desc: 'Find it cheaper? We match it' },
    { icon: Award, label: 'Loyalty rewards', desc: 'Earn points on every trip' },
];

/* ─── Animated counter ─── */
function Counter({ target, suffix = '+', label }: { target: number; suffix?: string; label: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
    const [display, setDisplay] = useState('0');

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, target, { duration: 2.2, ease: [0.22, 1, 0.36, 1] });
            const unsub = rounded.on('change', (v) => setDisplay(v));
            return () => { controls.stop(); unsub(); };
        }
    }, [isInView, target]);

    return (
        <div ref={ref} className="text-center">
            <span className="block text-4xl md:text-5xl font-display font-bold tracking-tight text-[#222] tabular-nums">
                {display}{suffix}
            </span>
            <span className="block mt-2 text-sm text-[#6a6a6a] font-medium tracking-wide uppercase">{label}</span>
        </div>
    );
}

/* ─── Animation variants ─── */
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
};
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};
const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

/* Card shadow matching DESIGN.md three-layer system */
const cardShadow = '0px 0px 0px 1px rgba(0,0,0,0.02), 0px 2px 6px rgba(0,0,0,0.04), 0px 4px 8px rgba(0,0,0,0.1)';
const cardHoverShadow = '0px 0px 0px 1px rgba(0,0,0,0.02), 0px 4px 12px rgba(0,0,0,0.08), 0px 8px 24px rgba(0,0,0,0.12)';

export default function Landing({ trending, featured, flashDeals, stats }: Props) {
    const { filters, setFilters } = useSearchStore();
    const { flash, visible, dismiss } = useFlash();

    return (
        <>
            <Head title="Book Flights, Trains, Buses & Ferries Across Southeast Asia" />
            <div className="min-h-screen bg-white">
                <Navbar />

                {/* ═══════════ HERO ═══════════ */}
                <section className="relative overflow-hidden bg-white">
                    {/* Subtle warm gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-50/40 via-white to-white" />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Left: Copy */}
                            <motion.div initial="hidden" animate="show" variants={stagger}>
                                <motion.div variants={fadeUp} className="mb-6">
                                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full">
                                        <Sparkles className="h-3.5 w-3.5" />
                                        AI-Powered Travel Platform
                                    </span>
                                </motion.div>
                                <motion.h1
                                    variants={fadeUp}
                                    className="text-[2.5rem] sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-display font-bold text-[#222] leading-[1.1] tracking-tight"
                                    style={{ letterSpacing: '-0.44px' }}
                                >
                                    Travel smarter.{' '}
                                    <span className="text-primary-500">Book faster.</span>
                                    <br />
                                    <span className="text-[#6a6a6a]">Explore everywhere.</span>
                                </motion.h1>
                                <motion.p variants={fadeUp} className="mt-6 text-lg text-[#6a6a6a] max-w-lg leading-relaxed">
                                    Compare and book flights, trains, buses, and ferries across
                                    Southeast Asia. One search. Best prices. Instant confirmation.
                                </motion.p>

                                <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                                    {[
                                        { icon: CheckCircle, text: '500+ routes' },
                                        { icon: CheckCircle, text: '20+ destinations' },
                                        { icon: CheckCircle, text: 'Instant e-tickets' },
                                    ].map((item) => (
                                        <span key={item.text} className="flex items-center gap-2 text-sm text-[#6a6a6a]">
                                            <item.icon className="h-4 w-4 text-teal" />
                                            {item.text}
                                        </span>
                                    ))}
                                </motion.div>
                            </motion.div>

                            {/* Right: Search Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 32 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div
                                    className="bg-white rounded-[20px] p-6 md:p-8"
                                    style={{ boxShadow: cardShadow }}
                                >
                                    <h2 className="text-[#222] font-display font-semibold text-xl mb-6" style={{ letterSpacing: '-0.18px' }}>
                                        Where to next?
                                    </h2>

                                    {/* Transport mode tabs */}
                                    <div className="flex gap-1 p-1 bg-[#f2f2f2] rounded-xl mb-6">
                                        {transportModes.map((mode) => (
                                            <button
                                                key={mode.mode}
                                                onClick={() => setFilters({ mode: mode.mode })}
                                                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                                                    filters.mode === mode.mode
                                                        ? 'bg-white text-[#222] shadow-sm'
                                                        : 'text-[#6a6a6a] hover:text-[#222]'
                                                }`}
                                            >
                                                <mode.icon className="h-3.5 w-3.5" />
                                                <span className="hidden sm:inline">{mode.label}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="space-y-3">
                                        <div className="relative">
                                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#c1c1c1]" />
                                            <input
                                                placeholder="From where?"
                                                value={filters.origin}
                                                onChange={(e) => setFilters({ origin: e.target.value })}
                                                className="w-full h-12 bg-white border border-[#c1c1c1] rounded-xl pl-10 pr-4 text-sm text-[#222] placeholder:text-[#c1c1c1] focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
                                            />
                                        </div>
                                        <div className="relative">
                                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#c1c1c1]" />
                                            <input
                                                placeholder="To where?"
                                                value={filters.destination}
                                                onChange={(e) => setFilters({ destination: e.target.value })}
                                                className="w-full h-12 bg-white border border-[#c1c1c1] rounded-xl pl-10 pr-4 text-sm text-[#222] placeholder:text-[#c1c1c1] focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#c1c1c1]" />
                                            <input
                                                type="date"
                                                value={filters.departure_date}
                                                onChange={(e) => setFilters({ departure_date: e.target.value })}
                                                className="w-full h-12 bg-white border border-[#c1c1c1] rounded-xl pl-10 pr-4 text-sm text-[#222] placeholder:text-[#c1c1c1] focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
                                            />
                                        </div>
                                        <Button
                                            size="lg"
                                            className="w-full h-12 mt-1 bg-[#222] text-white hover:bg-primary-600 rounded-xl text-base font-medium shadow-none"
                                            asChild
                                        >
                                            <Link href={`/search/results?origin=${filters.origin}&destination=${filters.destination}&date=${filters.departure_date}&mode=${filters.mode}`}>
                                                <Search className="h-4 w-4" />
                                                Search {transportModes.find(m => m.mode === filters.mode)?.label || 'Routes'}
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══════════ TRANSPORT MODES ═══════════ */}
                <section className="py-20 bg-white border-t border-[#f2f2f2]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={stagger}
                        >
                            {transportModes.map((mode) => (
                                <motion.div key={mode.mode} variants={fadeUp}>
                                    <Link href={`/search?mode=${mode.mode}`}>
                                        <div
                                            className="group relative bg-white rounded-[20px] p-6 transition-all duration-300 border border-transparent hover:border-primary-100"
                                            style={{ boxShadow: cardShadow }}
                                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = cardHoverShadow; }}
                                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = cardShadow; }}
                                        >
                                            <div className={`w-12 h-12 ${mode.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}>
                                                <mode.icon className={`h-6 w-6 ${mode.text}`} />
                                            </div>
                                            <h3 className="font-display font-semibold text-[#222] text-lg" style={{ letterSpacing: '-0.18px' }}>{mode.label}</h3>
                                            <p className="text-sm text-[#6a6a6a] mt-1">{mode.desc}</p>
                                            <ArrowRight className="h-4 w-4 text-transparent group-hover:text-primary-500 absolute top-6 right-6 transition-all duration-300 group-hover:translate-x-0 -translate-x-2" />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════ TRENDING DESTINATIONS ═══════════ */}
                {trending.length > 0 && (
                    <section className="py-20 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                className="flex items-end justify-between mb-10"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '-60px' }}
                                variants={fadeUp}
                            >
                                <div>
                                    <h2 className="text-[1.75rem] md:text-[2rem] font-display font-bold text-[#222]" style={{ letterSpacing: '-0.44px' }}>
                                        Trending destinations
                                    </h2>
                                    <p className="text-[#6a6a6a] mt-2 text-base max-w-lg">
                                        The most booked places across Southeast Asia this week.
                                    </p>
                                </div>
                                <Link
                                    href="/destinations"
                                    className="hidden md:flex items-center gap-2 text-[#222] font-medium text-sm hover:text-primary-600 transition-colors group"
                                >
                                    View all
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>

                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '-40px' }}
                                variants={stagger}
                            >
                                {trending.slice(0, 8).map((dest, i) => (
                                    <motion.div key={dest.id} variants={fadeUp}>
                                        <Link href={`/destinations/${dest.slug}`}>
                                            <div className="group relative rounded-[20px] overflow-hidden aspect-[3/4] cursor-pointer">
                                                {dest.image_url ? (
                                                    <img
                                                        src={dest.image_url}
                                                        alt={`Travel to ${dest.name}, ${dest.country}`}
                                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${
                                                        ['from-primary-400 to-primary-600', 'from-teal to-emerald-600', 'from-rose-400 to-pink-600', 'from-amber-400 to-orange-600',
                                                         'from-cyan-400 to-blue-600', 'from-fuchsia-400 to-purple-600', 'from-lime-400 to-green-600', 'from-sky-400 to-indigo-500'][i % 8]
                                                    }`} />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                                {dest.is_popular && (
                                                    <div className="absolute top-4 left-4">
                                                        <span className="bg-white/90 backdrop-blur-sm text-[#222] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                                                            <TrendingUp className="h-3 w-3" /> Trending
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                                    <p className="text-white/60 text-xs font-medium uppercase tracking-wider">{dest.country}</p>
                                                    <h3 className="text-white font-display font-bold text-xl mt-1">{dest.name}</h3>
                                                    {dest.avg_price && (
                                                        <p className="text-white/80 text-sm mt-2">
                                                            From <span className="text-white font-semibold">{formatCurrency(Number(dest.avg_price))}</span>
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="absolute top-4 right-4 w-8 h-8 bg-white/0 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm">
                                                    <ArrowRight className="h-4 w-4 text-white/0 group-hover:text-white transition-all duration-300" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <div className="md:hidden mt-8 text-center">
                                <Link href="/destinations" className="text-[#222] font-medium text-sm inline-flex items-center gap-1">
                                    View all destinations <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* ═══════════ STATS BANNER ═══════════ */}
                <section className="py-24 bg-[#f7f7f7]">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-14"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="text-[1.75rem] md:text-[2rem] font-display font-bold text-[#222]" style={{ letterSpacing: '-0.44px' }}>
                                Trusted by travelers across the region
                            </h2>
                            <p className="text-[#6a6a6a] mt-3 text-base">Real numbers. Real journeys. Real savings.</p>
                        </motion.div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                            <Counter target={stats.routes || 500} label="Routes" />
                            <Counter target={stats.destinations || 100} label="Destinations" />
                            <Counter target={stats.bookings || 10000} label="Bookings" />
                            <Counter target={stats.users || 5000} label="Travelers" />
                        </div>
                    </div>
                </section>

                {/* ═══════════ FLASH DEALS ═══════════ */}
                {flashDeals.length > 0 && (
                    <section className="py-20 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                className="flex items-end justify-between mb-10"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '-60px' }}
                                variants={fadeUp}
                            >
                                <div>
                                    <h2 className="text-[1.75rem] md:text-[2rem] font-display font-bold text-[#222]" style={{ letterSpacing: '-0.44px' }}>
                                        Flash deals
                                    </h2>
                                    <p className="text-[#6a6a6a] mt-2 text-base">Grab these low fares before they disappear.</p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '-40px' }}
                                variants={stagger}
                            >
                                {flashDeals.slice(0, 6).map((deal) => (
                                    <motion.div key={deal.id} variants={fadeUp}>
                                        <div
                                            className="group bg-white rounded-[20px] p-5 transition-all duration-300"
                                            style={{ boxShadow: cardShadow }}
                                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = cardHoverShadow; }}
                                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = cardShadow; }}
                                        >
                                            {/* Header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                                                        deal.mode === 'flight' ? 'bg-primary-50 text-primary-600' :
                                                        deal.mode === 'train' ? 'bg-teal/8 text-teal-dark' :
                                                        deal.mode === 'bus' ? 'bg-amber-50 text-amber-600' :
                                                        'bg-cyan-50 text-cyan-600'
                                                    }`}>
                                                        {deal.mode === 'flight' ? <Plane className="h-5 w-5" /> :
                                                         deal.mode === 'train' ? <Train className="h-5 w-5" /> :
                                                         deal.mode === 'bus' ? <Bus className="h-5 w-5" /> :
                                                         <Ship className="h-5 w-5" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-[#222]">{deal.provider?.name}</p>
                                                        <p className="text-xs text-[#6a6a6a] capitalize">{deal.mode}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-display font-bold text-[#222]">{formatCurrency(Number(deal.base_price))}</p>
                                                    <p className="text-[10px] text-[#6a6a6a] uppercase tracking-wider">per person</p>
                                                </div>
                                            </div>

                                            {/* Route */}
                                            <div className="flex items-center gap-3 py-3">
                                                <div className="flex-1">
                                                    <p className="text-lg font-display font-bold text-[#222]">{deal.origin_code}</p>
                                                    <p className="text-xs text-[#6a6a6a] truncate">{deal.origin_name}</p>
                                                </div>
                                                <div className="flex-1 flex flex-col items-center">
                                                    <p className="text-[10px] text-[#6a6a6a] mb-1">{formatDuration(deal.duration_minutes)}</p>
                                                    <div className="w-full flex items-center gap-1">
                                                        <div className="h-px flex-1 bg-[#c1c1c1]" />
                                                        <div className="w-2 h-2 rounded-full border-2 border-primary-400" />
                                                        <div className="h-px flex-1 bg-primary-300" />
                                                        <ArrowRight className="h-3 w-3 text-primary-400" />
                                                    </div>
                                                    <p className="text-[10px] text-[#6a6a6a] mt-1">{deal.stops === 0 ? 'Direct' : `${deal.stops} stop${deal.stops > 1 ? 's' : ''}`}</p>
                                                </div>
                                                <div className="flex-1 text-right">
                                                    <p className="text-lg font-display font-bold text-[#222]">{deal.destination_code}</p>
                                                    <p className="text-xs text-[#6a6a6a] truncate">{deal.destination_name}</p>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f2f2f2]">
                                                <span className="flex items-center gap-1 text-xs text-[#6a6a6a]">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(deal.departure_at)}
                                                </span>
                                                <Button size="sm" className="h-8 text-xs bg-[#222] text-white hover:bg-primary-600 shadow-none rounded-lg" asChild>
                                                    <Link href={`/search/results?origin=${deal.origin_code}&destination=${deal.destination_code}&date=${deal.departure_at.split('T')[0]}&mode=${deal.mode}`}>
                                                        Book now
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* ═══════════ WHY FLYONE ═══════════ */}
                <section className="py-20 bg-[#f7f7f7]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-14"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="text-[1.75rem] md:text-[2rem] font-display font-bold text-[#222]" style={{ letterSpacing: '-0.44px' }}>
                                Built for the way you travel
                            </h2>
                            <p className="text-[#6a6a6a] mt-3 max-w-2xl mx-auto text-base">
                                Whether you're planning a weekend getaway or a multi-city adventure,
                                Flyone makes every step seamless.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-40px' }}
                            variants={stagger}
                        >
                            {trustSignals.map((item) => (
                                <motion.div key={item.label} variants={fadeUp}>
                                    <div
                                        className="group text-center bg-white rounded-[20px] p-8 transition-all duration-300"
                                        style={{ boxShadow: cardShadow }}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = cardHoverShadow; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = cardShadow; }}
                                    >
                                        <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-105 transition-transform duration-300">
                                            <item.icon className="h-7 w-7 text-primary-600" />
                                        </div>
                                        <h3 className="font-display font-semibold text-[#222] text-lg" style={{ letterSpacing: '-0.18px' }}>{item.label}</h3>
                                        <p className="text-[#6a6a6a] text-sm mt-2 leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════ FEATURED DESTINATIONS ═══════════ */}
                {featured.length > 0 && (
                    <section className="py-20 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                className="mb-10"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                variants={fadeUp}
                            >
                                <h2 className="text-[1.75rem] md:text-[2rem] font-display font-bold text-[#222]" style={{ letterSpacing: '-0.44px' }}>
                                    Must-visit destinations
                                </h2>
                                <p className="text-[#6a6a6a] mt-2 text-base max-w-lg">
                                    Hand-picked by our travel experts for unforgettable experiences.
                                </p>
                            </motion.div>

                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 gap-5"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '-40px' }}
                                variants={stagger}
                            >
                                {featured.slice(0, 4).map((dest, i) => (
                                    <motion.div key={dest.id} variants={scaleIn}>
                                        <Link href={`/destinations/${dest.slug}`}>
                                            <div className={`group relative rounded-[20px] overflow-hidden cursor-pointer ${i === 0 ? 'md:row-span-2 aspect-square md:aspect-auto md:h-full' : 'aspect-[2/1]'}`}>
                                                <div className={`absolute inset-0 bg-gradient-to-br ${
                                                    ['from-primary-400 to-primary-600', 'from-teal to-emerald-600', 'from-rose-400 to-pink-600', 'from-amber-400 to-orange-600'][i % 4]
                                                }`} />
                                                {dest.image_url && (
                                                    <img src={dest.image_url} alt={`${dest.name} travel guide`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                                    <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
                                                        <Star className="h-3 w-3 text-amber-300" /> Featured
                                                    </span>
                                                    <h3 className="text-white font-display font-bold text-2xl md:text-3xl">{dest.name}</h3>
                                                    <p className="text-white/70 text-sm mt-1">{dest.country}</p>
                                                    {dest.description && (
                                                        <p className="text-white/50 text-sm mt-3 line-clamp-2 max-w-md">{dest.description}</p>
                                                    )}
                                                    {dest.avg_price && (
                                                        <p className="text-white/80 text-sm mt-3 font-medium">
                                                            Routes from {formatCurrency(Number(dest.avg_price))}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* ═══════════ CTA BANNER ═══════════ */}
                <section className="py-20 bg-[#f7f7f7]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="relative rounded-[32px] overflow-hidden bg-[#222]"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            variants={scaleIn}
                        >
                            {/* Subtle accent orbs */}
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/15 rounded-full blur-[100px]" />
                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal/12 rounded-full blur-[80px]" />

                            <div className="relative px-8 py-16 md:px-16 md:py-20 flex flex-col md:flex-row items-center gap-10">
                                <div className="flex-1">
                                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 bg-white/10 px-4 py-1.5 rounded-full mb-6">
                                        <Globe className="h-3.5 w-3.5" /> Coming Soon
                                    </span>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight" style={{ letterSpacing: '-0.44px' }}>
                                        Your journey,<br />in your pocket.
                                    </h2>
                                    <p className="text-white/50 text-base md:text-lg mt-5 max-w-md leading-relaxed">
                                        Download the Flyone app. Book on the go, get live updates,
                                        manage trips, and earn loyalty rewards — all from your phone.
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-8">
                                        <button className="h-12 px-6 bg-white text-[#222] font-medium text-sm rounded-xl hover:bg-white/90 transition-colors">
                                            App Store
                                        </button>
                                        <button className="h-12 px-6 bg-transparent text-white font-medium text-sm rounded-xl border border-white/20 hover:bg-white/10 transition-colors">
                                            Google Play
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 hidden md:flex items-center justify-center">
                                    <div className="w-48 h-48 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Plane className="h-20 w-20 text-white/20" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <Footer />
            </div>

            {flash.success && <Toast message={flash.success} type="success" visible={visible} onDismiss={dismiss} />}
            {flash.error && <Toast message={flash.error} type="error" visible={visible} onDismiss={dismiss} />}
        </>
    );
}
