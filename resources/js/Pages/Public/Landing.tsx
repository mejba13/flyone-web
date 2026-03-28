import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Navbar } from '@/Components/layout/Navbar';
import { Footer } from '@/Components/layout/Footer';
import { Toast } from '@/Components/ui/toast';
import { useFlash } from '@/Hooks/useFlash';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { useSearchStore } from '@/Stores/searchStore';
import { formatCurrency, formatDate, formatDuration } from '@/Lib/utils';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
    Plane, Train, Bus, Ship, Search, ArrowRight,
    MapPin, TrendingUp, Sparkles, Shield,
    ChevronRight, Calendar, Star, Globe, Zap, Heart,
    ArrowDown, CheckCircle, Award,
} from 'lucide-react';
import type { Route, Destination } from '@/Types';

interface Props {
    trending: Destination[];
    featured: Destination[];
    flashDeals: Route[];
    stats: { routes: number; destinations: number; bookings: number; users: number };
}

const transportModes = [
    { icon: Plane, label: 'Flights', mode: 'flight', gradient: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', text: 'text-violet-600', desc: 'Compare 100+ airlines' },
    { icon: Train, label: 'Trains', mode: 'train', gradient: 'from-teal to-emerald-500', bg: 'bg-teal/5', text: 'text-teal-dark', desc: 'Scenic rail journeys' },
    { icon: Bus, label: 'Buses', mode: 'bus', gradient: 'from-amber-400 to-orange-500', bg: 'bg-amber-50', text: 'text-amber-600', desc: 'Budget-friendly routes' },
    { icon: Ship, label: 'Ferries', mode: 'ferry', gradient: 'from-cyan-400 to-blue-500', bg: 'bg-cyan-50', text: 'text-cyan-600', desc: 'Island-hop with ease' },
];

const trustSignals = [
    { icon: Shield, label: 'Secure payments', desc: 'PCI DSS Level 1 certified' },
    { icon: Zap, label: 'Instant confirmation', desc: 'Real-time booking guarantee' },
    { icon: Heart, label: 'Best price promise', desc: 'Find it cheaper? We match it' },
    { icon: Award, label: 'Loyalty rewards', desc: 'Earn points on every trip' },
];

/* ─── Animated counter with intersection observer ─── */
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
            <span className="block text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white tabular-nums">
                {display}{suffix}
            </span>
            <span className="block mt-2 text-sm md:text-base text-white/60 font-medium tracking-wide uppercase">{label}</span>
        </div>
    );
}

/* ─── Stagger wrapper ─── */
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};
const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function Landing({ trending, featured, flashDeals, stats }: Props) {
    const { filters, setFilters } = useSearchStore();
    const { flash, visible, dismiss } = useFlash();

    return (
        <>
            <Head title="Book Flights, Trains, Buses & Ferries Across Southeast Asia" />
            <div className="min-h-screen bg-soft">
                <Navbar />

                {/* ═══════════ HERO WITH VIDEO ═══════════ */}
                <section className="relative min-h-[92vh] flex items-center overflow-hidden">
                    {/* Video background */}
                    <div className="absolute inset-0 bg-[#0f0a1e]">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className="absolute inset-0 w-full h-full object-cover opacity-40"
                            aria-hidden="true"
                        >
                            <source src="/videos/hero-travel.mp4" type="video/mp4" />
                        </video>
                        {/* Gradient overlays for readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0a1e]/95 via-[#0f0a1e]/70 to-[#0f0a1e]/50" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a1e] via-transparent to-[#0f0a1e]/40" />
                        {/* Animated color accent orbs over video */}
                        <motion.div
                            className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
                            style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)', top: '-10%', right: '10%' }}
                            animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0] }}
                            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                        />
                        <motion.div
                            className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
                            style={{ background: 'radial-gradient(circle, #5BCFCF 0%, transparent 70%)', bottom: '10%', left: '5%' }}
                            animate={{ x: [0, -25, 15, 0], y: [0, 15, -25, 0] }}
                            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                        />
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            {/* Left: Copy */}
                            <motion.div initial="hidden" animate="show" variants={stagger}>
                                <motion.div variants={fadeUp}>
                                    <Badge className="bg-white/10 text-white/90 border border-white/10 backdrop-blur-sm mb-6 px-4 py-1.5 text-sm">
                                        <Sparkles className="h-3.5 w-3.5 mr-1.5 text-amber-400" />
                                        AI-Powered Travel Platform
                                    </Badge>
                                </motion.div>
                                <motion.h1
                                    variants={fadeUp}
                                    className="text-[2.75rem] sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight"
                                >
                                    Travel smarter.{' '}
                                    <span className="relative">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-teal to-primary-300 bg-[length:200%] animate-[shimmer_3s_ease-in-out_infinite]">
                                            Book faster.
                                        </span>
                                    </span>
                                    <br />
                                    <span className="text-white/50">Explore everywhere.</span>
                                </motion.h1>
                                <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl text-white/50 max-w-xl leading-relaxed">
                                    Compare and book flights, trains, buses, and ferries across Southeast Asia.
                                    One search. Best prices. Instant confirmation.
                                </motion.p>

                                {/* Trust badges inline */}
                                <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                                    {[
                                        { icon: CheckCircle, text: '500+ routes' },
                                        { icon: CheckCircle, text: '20+ destinations' },
                                        { icon: CheckCircle, text: 'Instant e-tickets' },
                                    ].map((item) => (
                                        <span key={item.text} className="flex items-center gap-1.5 text-sm text-white/40">
                                            <item.icon className="h-4 w-4 text-teal" />
                                            {item.text}
                                        </span>
                                    ))}
                                </motion.div>
                            </motion.div>

                            {/* Right: Search Card (Glass) */}
                            <motion.div
                                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="relative">
                                    {/* Glow behind card */}
                                    <div className="absolute -inset-4 bg-gradient-to-br from-primary-500/20 to-teal/20 rounded-3xl blur-2xl" />
                                    <div className="relative bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-6 shadow-2xl">
                                        <h2 className="text-white font-display font-semibold text-lg mb-5">Where to next?</h2>

                                        {/* Transport mode tabs */}
                                        <div className="flex gap-1 p-1 bg-white/5 rounded-xl mb-5">
                                            {transportModes.map((mode) => (
                                                <button
                                                    key={mode.mode}
                                                    onClick={() => setFilters({ mode: mode.mode })}
                                                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                                                        filters.mode === mode.mode
                                                            ? 'bg-white/15 text-white shadow-sm'
                                                            : 'text-white/40 hover:text-white/60'
                                                    }`}
                                                >
                                                    <mode.icon className="h-3.5 w-3.5" />
                                                    <span className="hidden sm:inline">{mode.label}</span>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="space-y-3">
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                                                <input
                                                    placeholder="From where?"
                                                    value={filters.origin}
                                                    onChange={(e) => setFilters({ origin: e.target.value })}
                                                    className="w-full h-12 bg-white/[0.06] border border-white/10 rounded-xl pl-10 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-primary-400/40 focus:border-primary-400/40 transition-all"
                                                />
                                            </div>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                                                <input
                                                    placeholder="To where?"
                                                    value={filters.destination}
                                                    onChange={(e) => setFilters({ destination: e.target.value })}
                                                    className="w-full h-12 bg-white/[0.06] border border-white/10 rounded-xl pl-10 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-primary-400/40 focus:border-primary-400/40 transition-all"
                                                />
                                            </div>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                                                <input
                                                    type="date"
                                                    value={filters.departure_date}
                                                    onChange={(e) => setFilters({ departure_date: e.target.value })}
                                                    className="w-full h-12 bg-white/[0.06] border border-white/10 rounded-xl pl-10 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-primary-400/40 focus:border-primary-400/40 transition-all [color-scheme:dark]"
                                                />
                                            </div>
                                            <Button size="lg" className="w-full h-12 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg shadow-primary-500/25 mt-1" asChild>
                                                <Link href={`/search/results?origin=${filters.origin}&destination=${filters.destination}&date=${filters.departure_date}&mode=${filters.mode}`}>
                                                    <Search className="h-4 w-4" />
                                                    Search {transportModes.find(m => m.mode === filters.mode)?.label || 'Routes'}
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Scroll indicator */}
                        <motion.div
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <span className="text-white/20 text-xs tracking-widest uppercase">Explore</span>
                            <ArrowDown className="h-4 w-4 text-white/20" />
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════ TRANSPORT MODES ═══════════ */}
                <section className="py-20 -mt-12 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={stagger}
                        >
                            {transportModes.map((mode) => (
                                <motion.div key={mode.mode} variants={fadeUp}>
                                    <Link href={`/search?mode=${mode.mode}`}>
                                        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-primary-100 overflow-hidden">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />
                                            <div className={`w-12 h-12 ${mode.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                                <mode.icon className={`h-6 w-6 ${mode.text}`} />
                                            </div>
                                            <h3 className="font-display font-semibold text-deep text-lg">{mode.label}</h3>
                                            <p className="text-sm text-deep-lighter mt-1">{mode.desc}</p>
                                            <ArrowRight className="h-4 w-4 text-deep-lighter/0 group-hover:text-primary-500 absolute top-6 right-6 transition-all duration-300 group-hover:translate-x-0 -translate-x-2" />
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
                                className="flex items-end justify-between mb-12"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '-60px' }}
                                variants={fadeUp}
                            >
                                <div>
                                    <span className="text-primary-500 font-semibold text-sm tracking-wide uppercase">Popular Now</span>
                                    <h2 className="text-3xl md:text-4xl font-display font-bold text-deep mt-2">
                                        Trending destinations
                                    </h2>
                                    <p className="text-deep-lighter mt-3 max-w-xl text-lg">
                                        The most booked places across Southeast Asia this week.
                                        Explore vibrant cities, tropical islands, and cultural hotspots.
                                    </p>
                                </div>
                                <Link
                                    href="/destinations"
                                    className="hidden md:flex items-center gap-2 text-primary-600 font-medium hover:gap-3 transition-all group"
                                >
                                    View all destinations
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
                                            <div className="group relative rounded-2xl overflow-hidden bg-deep aspect-[3/4] cursor-pointer">
                                                {/* Background */}
                                                {dest.image_url ? (
                                                    <img
                                                        src={dest.image_url}
                                                        alt={`Travel to ${dest.name}, ${dest.country}`}
                                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${
                                                        ['from-violet-600 to-indigo-800', 'from-teal to-emerald-600', 'from-rose-500 to-pink-700', 'from-amber-500 to-orange-700',
                                                         'from-cyan-500 to-blue-700', 'from-fuchsia-500 to-purple-700', 'from-lime-500 to-green-700', 'from-sky-500 to-indigo-600'][i % 8]
                                                    }`} />
                                                )}
                                                {/* Gradient overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                                {/* Badges */}
                                                {dest.is_popular && (
                                                    <div className="absolute top-4 left-4">
                                                        <span className="bg-amber-400 text-amber-950 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                                            <TrendingUp className="h-3 w-3" /> Trending
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Content */}
                                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                                    <p className="text-white/50 text-xs font-medium uppercase tracking-wider">{dest.country}</p>
                                                    <h3 className="text-white font-display font-bold text-xl mt-1">{dest.name}</h3>
                                                    {dest.avg_price && (
                                                        <p className="text-white/70 text-sm mt-2">
                                                            From <span className="text-white font-semibold">{formatCurrency(Number(dest.avg_price))}</span>
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Hover arrow */}
                                                <div className="absolute top-4 right-4 w-8 h-8 bg-white/0 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm">
                                                    <ArrowRight className="h-4 w-4 text-white/0 group-hover:text-white transition-all duration-300" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <div className="md:hidden mt-8 text-center">
                                <Link href="/destinations" className="text-primary-600 font-medium text-sm flex items-center justify-center gap-1">
                                    View all destinations <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* ═══════════ STATS BANNER ═══════════ */}
                <section className="relative py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-[#0f0a1e]">
                        <div className="absolute inset-0 opacity-[0.04]" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                            backgroundSize: '32px 32px',
                        }} />
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px]" />
                        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal/10 rounded-full blur-[100px]" />
                    </div>
                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-16"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                                Trusted by travelers across the region
                            </h2>
                            <p className="text-white/40 mt-3 text-lg">Real numbers. Real journeys. Real savings.</p>
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
                    <section className="py-20 bg-soft">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                className="flex items-end justify-between mb-12"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '-60px' }}
                                variants={fadeUp}
                            >
                                <div>
                                    <span className="text-rose-500 font-semibold text-sm tracking-wide uppercase flex items-center gap-1.5">
                                        <Sparkles className="h-4 w-4" /> Limited Time
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-display font-bold text-deep mt-2">Flash deals</h2>
                                    <p className="text-deep-lighter mt-3 text-lg">Grab these low fares before they disappear.</p>
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
                                        <div className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary-100">
                                            {/* Header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${
                                                        deal.mode === 'flight' ? 'bg-violet-50 text-violet-600' :
                                                        deal.mode === 'train' ? 'bg-teal/5 text-teal-dark' :
                                                        deal.mode === 'bus' ? 'bg-amber-50 text-amber-600' :
                                                        'bg-cyan-50 text-cyan-600'
                                                    }`}>
                                                        {deal.mode === 'flight' ? <Plane className="h-5 w-5" /> :
                                                         deal.mode === 'train' ? <Train className="h-5 w-5" /> :
                                                         deal.mode === 'bus' ? <Bus className="h-5 w-5" /> :
                                                         <Ship className="h-5 w-5" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-deep">{deal.provider?.name}</p>
                                                        <p className="text-xs text-deep-lighter capitalize">{deal.mode}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-display font-bold text-deep">{formatCurrency(Number(deal.base_price))}</p>
                                                    <p className="text-[10px] text-deep-lighter uppercase tracking-wider">per person</p>
                                                </div>
                                            </div>

                                            {/* Route */}
                                            <div className="flex items-center gap-3 py-3">
                                                <div className="flex-1">
                                                    <p className="text-lg font-display font-bold text-deep">{deal.origin_code}</p>
                                                    <p className="text-xs text-deep-lighter truncate">{deal.origin_name}</p>
                                                </div>
                                                <div className="flex-1 flex flex-col items-center">
                                                    <p className="text-[10px] text-deep-lighter mb-1">{formatDuration(deal.duration_minutes)}</p>
                                                    <div className="w-full flex items-center gap-1">
                                                        <div className="h-px flex-1 bg-soft-dark" />
                                                        <div className="w-2 h-2 rounded-full border-2 border-primary-400" />
                                                        <div className="h-px flex-1 bg-primary-300" />
                                                        <ArrowRight className="h-3 w-3 text-primary-400" />
                                                    </div>
                                                    <p className="text-[10px] text-deep-lighter mt-1">{deal.stops === 0 ? 'Direct' : `${deal.stops} stop${deal.stops > 1 ? 's' : ''}`}</p>
                                                </div>
                                                <div className="flex-1 text-right">
                                                    <p className="text-lg font-display font-bold text-deep">{deal.destination_code}</p>
                                                    <p className="text-xs text-deep-lighter truncate">{deal.destination_name}</p>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-soft-dark/50">
                                                <div className="flex items-center gap-3 text-xs text-deep-lighter">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {formatDate(deal.departure_at)}
                                                    </span>
                                                </div>
                                                <Button size="sm" className="h-8 text-xs" asChild>
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

                {/* ═══════════ WHY FLYONE (Trust Signals) ═══════════ */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-16"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <span className="text-teal-dark font-semibold text-sm tracking-wide uppercase">Why Flyone</span>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-deep mt-2">
                                Built for the way you travel
                            </h2>
                            <p className="text-deep-lighter mt-3 max-w-2xl mx-auto text-lg">
                                Whether you're planning a weekend getaway or a multi-city adventure,
                                Flyone makes every step seamless.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-40px' }}
                            variants={stagger}
                        >
                            {trustSignals.map((item) => (
                                <motion.div key={item.label} variants={fadeUp}>
                                    <div className="group text-center p-8 rounded-2xl hover:bg-soft transition-colors duration-300">
                                        <div className="w-14 h-14 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                                            <item.icon className="h-7 w-7 text-primary-600" />
                                        </div>
                                        <h3 className="font-display font-semibold text-deep text-lg">{item.label}</h3>
                                        <p className="text-deep-lighter text-sm mt-2 leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════ FEATURED DESTINATIONS (Editorial) ═══════════ */}
                {featured.length > 0 && (
                    <section className="py-20 bg-soft">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                className="mb-12"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                variants={fadeUp}
                            >
                                <span className="text-primary-500 font-semibold text-sm tracking-wide uppercase">Editor's Picks</span>
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-deep mt-2">
                                    Must-visit destinations
                                </h2>
                                <p className="text-deep-lighter mt-3 text-lg max-w-xl">
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
                                            <div className={`group relative rounded-2xl overflow-hidden cursor-pointer ${i === 0 ? 'md:row-span-2 aspect-square md:aspect-auto md:h-full' : 'aspect-[2/1]'}`}>
                                                <div className={`absolute inset-0 bg-gradient-to-br ${
                                                    ['from-deep via-deep-light to-primary-600', 'from-teal to-emerald-600', 'from-rose-500 to-pink-600', 'from-amber-500 to-orange-600'][i % 4]
                                                }`} />
                                                {dest.image_url && (
                                                    <img src={dest.image_url} alt={`${dest.name} travel guide`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                                    <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm mb-3 text-xs">
                                                        <Star className="h-3 w-3 mr-1 text-amber-400" /> Featured
                                                    </Badge>
                                                    <h3 className="text-white font-display font-bold text-2xl md:text-3xl">{dest.name}</h3>
                                                    <p className="text-white/60 text-sm mt-1">{dest.country}</p>
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
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="relative rounded-3xl overflow-hidden"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            variants={scaleIn}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a1e] via-deep to-primary-600" />
                            <div className="absolute inset-0 opacity-[0.06]" style={{
                                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
                                backgroundSize: '24px 24px',
                            }} />
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal/15 rounded-full blur-[100px]" />
                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary-400/15 rounded-full blur-[80px]" />

                            <div className="relative px-8 py-16 md:px-16 md:py-20 flex flex-col md:flex-row items-center gap-10">
                                <div className="flex-1">
                                    <Badge className="bg-white/10 text-white/80 border border-white/10 backdrop-blur-sm mb-4 text-sm">
                                        <Globe className="h-3.5 w-3.5 mr-1.5" /> Coming Soon
                                    </Badge>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
                                        Your journey,<br />in your pocket.
                                    </h2>
                                    <p className="text-white/50 text-lg mt-4 max-w-md">
                                        Download the Flyone app. Book on the go, get live updates,
                                        manage trips, and earn loyalty rewards — all from your phone.
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-8">
                                        <Button size="lg" className="bg-white text-deep hover:bg-white/90 shadow-lg">
                                            App Store
                                        </Button>
                                        <Button size="lg" variant="secondary" className="border-white/20 text-white hover:bg-white/10">
                                            Google Play
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 hidden md:flex items-center justify-center">
                                    <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-primary-400/30 to-teal/30 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                                        <Plane className="h-20 w-20 text-white/40" />
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
