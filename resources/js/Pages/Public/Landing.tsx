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
    Calendar, Star, Zap, Heart,
    Award, Clock,
} from 'lucide-react';
import type { Route, Destination } from '@/Types';

interface Props {
    trending: Destination[];
    featured: Destination[];
    flashDeals: Route[];
    stats: { routes: number; destinations: number; bookings: number; users: number };
}

const transportModes = [
    { icon: Plane, label: 'Flights', mode: 'flight', desc: 'Compare 100+ airlines', image: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=600&h=450&fit=crop&q=80', accent: 'from-violet-900/40 to-indigo-900/60', tabActive: 'bg-violet-500/15 text-violet-300 border-violet-400/25', iconColor: 'text-violet-400' },
    { icon: Train, label: 'Trains', mode: 'train', desc: 'Scenic rail journeys', image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?w=600&h=450&fit=crop&q=80', accent: 'from-emerald-900/40 to-teal-900/60', tabActive: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/25', iconColor: 'text-emerald-400' },
    { icon: Bus, label: 'Buses', mode: 'bus', desc: 'Budget-friendly routes', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=450&fit=crop&q=80', accent: 'from-amber-900/40 to-orange-900/60', tabActive: 'bg-amber-500/15 text-amber-300 border-amber-400/25', iconColor: 'text-amber-400' },
    { icon: Ship, label: 'Ferries', mode: 'ferry', desc: 'Island-hop with ease', image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=600&h=450&fit=crop&q=80', accent: 'from-sky-900/40 to-blue-900/60', tabActive: 'bg-sky-500/15 text-sky-300 border-sky-400/25', iconColor: 'text-sky-400' },
];

const trustSignals = [
    { icon: Shield, label: 'PCI DSS Level 1 certified' },
    { icon: Zap, label: 'Real-time booking guarantee' },
    { icon: Heart, label: "Find it cheaper? We match it" },
    { icon: Award, label: 'Earn points on every trip' },
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
            const controls = animate(count, target, { duration: 2.4, ease: [0.22, 1, 0.36, 1] });
            const unsub = rounded.on('change', (v) => setDisplay(v));
            return () => { controls.stop(); unsub(); };
        }
    }, [isInView, target]);

    return (
        <motion.div ref={ref} variants={fadeUp} className="relative group">
            <div className="relative bg-white/[0.03] rounded-2xl border border-white/[0.05] p-6 md:p-8 text-center group-hover:border-primary-400/15 transition-all duration-500">
                {/* Subtle top glow on hover */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary-400/0 group-hover:via-primary-400/30 to-transparent transition-all duration-700" />
                <span className="block text-[2.5rem] md:text-[3.5rem] font-display font-bold tracking-tight text-white tabular-nums leading-none">
                    {display}<span className="bg-gradient-to-r from-primary-400 to-teal bg-clip-text text-transparent">{suffix}</span>
                </span>
                <span className="block mt-3 text-[13px] text-white/40 font-semibold tracking-[0.1em] uppercase">{label}</span>
            </div>
        </motion.div>
    );
}

/* ─── Animation variants ─── */
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};
const scaleIn = {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ─── Section heading (dark theme) ─── */
function SectionHeader({ eyebrow, title, subtitle, align = 'left', children }: {
    eyebrow?: string; title: string; subtitle?: string; align?: 'left' | 'center'; children?: React.ReactNode;
}) {
    return (
        <motion.div
            className={`${align === 'center' ? 'text-center' : ''} ${children ? 'flex items-end justify-between' : ''}`}
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
        >
            <div>
                {eyebrow && (
                    <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] uppercase text-primary-400 mb-4">
                        <span className="w-8 h-[1px] bg-gradient-to-r from-primary-400 to-transparent" />
                        {eyebrow}
                    </span>
                )}
                <h2 className="text-[2rem] md:text-[2.625rem] font-display font-bold text-white leading-[1.12]" style={{ letterSpacing: '-0.4px' }}>
                    {title}
                </h2>
                {subtitle && (
                    <p className={`text-white/40 mt-4 text-[16px] leading-relaxed ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-lg'}`}>{subtitle}</p>
                )}
            </div>
            {children}
        </motion.div>
    );
}

/* ─── Reusable dark section wrapper ─── */
function DarkSection({ children, className = '', bg = '#0a0a12' }: { children: React.ReactNode; className?: string; bg?: string }) {
    return (
        <section className={`relative py-20 md:py-24 overflow-hidden ${className}`} style={{ backgroundColor: bg }}>
            {children}
        </section>
    );
}

export default function Landing({ trending, featured, flashDeals, stats }: Props) {
    const { filters, setFilters } = useSearchStore();
    const { flash, visible, dismiss } = useFlash();

    return (
        <>
            <Head title="Book Flights, Trains, Buses & Ferries Across Southeast Asia" />
            <div className="min-h-screen bg-[#08080e]">
                <Navbar />

                {/* ═══════════════════════════════════════════════ */}
                {/* ═══════════ HERO — Cinematic Premium ════════ */}
                {/* ═══════════════════════════════════════════════ */}
                <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-[#08080e]">
                    {/* Video background — high visibility cinematic */}
                    <div className="absolute inset-0">
                        <video
                            autoPlay muted loop playsInline preload="auto"
                            className="absolute inset-0 w-full h-full object-cover opacity-[0.55]"
                            aria-hidden="true"
                        >
                            <source src="/videos/hero-travel.mp4" type="video/mp4" />
                        </video>
                        {/* Vignette — darkens edges, keeps center bright */}
                        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 70% at 60% 50%, transparent 20%, rgba(8,8,14,0.65) 100%)' }} />
                        {/* Top scrim for navbar readability */}
                        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#08080e]/70 to-transparent" />
                        {/* Bottom scrim for section transition */}
                        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#08080e] via-[#08080e]/80 to-transparent" />
                        {/* Left text readability scrim */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#08080e]/60 via-[#08080e]/20 to-transparent" />
                    </div>

                    {/* Animated luminous orbs */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            className="absolute w-[700px] h-[700px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 65%)', top: '-10%', right: '0%' }}
                            animate={{ x: [0, 50, -25, 0], y: [0, -35, 20, 0], scale: [1, 1.1, 0.92, 1] }}
                            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                        />
                        <motion.div
                            className="absolute w-[550px] h-[550px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(91,207,207,0.1) 0%, transparent 65%)', bottom: '0%', left: '-8%' }}
                            animate={{ x: [0, -35, 25, 0], y: [0, 25, -35, 0], scale: [1, 0.93, 1.07, 1] }}
                            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                        />
                        <motion.div
                            className="absolute w-[400px] h-[400px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 65%)', top: '35%', left: '25%' }}
                            animate={{ x: [0, 30, -18, 0], y: [0, -18, 30, 0] }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        />
                        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
                    </div>

                    {/* Hero content */}
                    <div className="relative flex-1 flex items-center pt-[72px]">
                        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 w-full py-12 md:py-16 lg:py-0">
                            <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_440px] gap-10 lg:gap-16 items-center">
                                {/* Left: Premium typography */}
                                <motion.div initial="hidden" animate="show" variants={stagger}>
                                    <motion.div variants={fadeUp} className="mb-8">
                                        <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase text-primary-300/80 bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm px-5 py-2.5 rounded-full">
                                            <span className="relative flex h-1.5 w-1.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-50" />
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-400" />
                                            </span>
                                            AI-Powered Travel Platform
                                        </span>
                                    </motion.div>

                                    <motion.h1 variants={fadeUp}>
                                        {/* Serif "Travel" + sans "smarter" — mixed type creates tension */}
                                        <span className="block text-[3rem] sm:text-[3.75rem] lg:text-[4.5rem] xl:text-[5.25rem] leading-[0.95] tracking-[-0.03em]">
                                            <span className="font-serif font-bold text-white italic">Travel</span>
                                            <span className="font-display font-bold text-white"> smarter.</span>
                                        </span>
                                        <span className="block text-[3rem] sm:text-[3.75rem] lg:text-[4.5rem] xl:text-[5.25rem] leading-[0.95] tracking-[-0.03em] mt-1">
                                            <span className="font-serif font-bold italic bg-gradient-to-r from-primary-300 via-primary-400 to-teal bg-clip-text text-transparent">Book</span>
                                            <span className="font-display font-bold bg-gradient-to-r from-primary-400 to-teal bg-clip-text text-transparent"> faster.</span>
                                        </span>
                                        <span className="block text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] font-display font-bold text-white/[0.12] leading-[0.95] tracking-[-0.03em] mt-1">
                                            Explore everywhere.
                                        </span>
                                    </motion.h1>

                                    {/* Elegant separator */}
                                    <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4">
                                        <div className="w-10 h-[1px] bg-gradient-to-r from-primary-500/50 to-transparent" />
                                        <p className="text-[15px] md:text-[16px] text-white/30 max-w-[380px] leading-[1.75] font-light">
                                            Compare and book flights, trains, buses, and ferries across
                                            Southeast Asia. One search. Best prices.
                                        </p>
                                    </motion.div>

                                    <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-6">
                                        {['500+ routes', '20+ destinations', 'Instant e-tickets'].map((text) => (
                                            <span key={text} className="flex items-center gap-2.5 text-[12px] text-white/20 font-medium tracking-wide">
                                                <span className="w-1 h-1 rounded-full bg-gradient-to-r from-primary-400 to-teal" />
                                                {text}
                                            </span>
                                        ))}
                                    </motion.div>
                                </motion.div>

                                {/* Right: Luxurious search card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <div className="relative">
                                        {/* Multi-layer glow */}
                                        <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-primary-500/15 via-transparent to-teal/10 blur-2xl" />
                                        <div className="absolute -inset-[1px] rounded-[22px] bg-gradient-to-br from-primary-400/20 via-white/[0.06] to-teal/15" />

                                        <div className="relative bg-[#12111e]/80 backdrop-blur-2xl rounded-[20px] p-7 sm:p-8 shadow-[0_12px_60px_rgba(0,0,0,0.5)]">
                                            <div className="flex items-center justify-between mb-6">
                                                <h2 className="text-white font-serif text-[20px] font-bold italic" style={{ letterSpacing: '-0.2px' }}>
                                                    Where to next?
                                                </h2>
                                                <span className="text-[10px] text-white/20 font-medium tracking-widest uppercase">Search</span>
                                            </div>

                                            {/* Transport tabs — colorful pills */}
                                            <div className="flex gap-1.5 mb-6">
                                                {transportModes.map((mode) => (
                                                    <button
                                                        key={mode.mode}
                                                        onClick={() => setFilters({ mode: mode.mode })}
                                                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-300 border ${
                                                            filters.mode === mode.mode
                                                                ? mode.tabActive
                                                                : 'bg-white/[0.03] text-white/25 border-white/[0.04] hover:text-white/50 hover:border-white/[0.08]'
                                                        }`}
                                                    >
                                                        <mode.icon className={`h-3.5 w-3.5 ${filters.mode !== mode.mode ? mode.iconColor : ''}`} />
                                                        <span className="hidden sm:inline">{mode.label}</span>
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="space-y-3">
                                                {[
                                                    { icon: MapPin, placeholder: 'Departing from...', value: filters.origin, key: 'origin' as const },
                                                    { icon: MapPin, placeholder: 'Arriving at...', value: filters.destination, key: 'destination' as const },
                                                ].map((field) => (
                                                    <div key={field.key} className="relative group">
                                                        <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 h-[15px] w-[15px] text-white/15 group-focus-within:text-primary-400/50 transition-colors" />
                                                        <input
                                                            placeholder={field.placeholder}
                                                            value={field.value}
                                                            onChange={(e) => setFilters({ [field.key]: e.target.value })}
                                                            className="w-full h-[48px] bg-white/[0.03] border border-white/[0.06] rounded-xl pl-11 pr-4 text-[14px] text-white placeholder:text-white/15 focus:outline-none focus:bg-white/[0.05] focus:border-primary-400/25 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.08)] transition-all duration-300"
                                                        />
                                                    </div>
                                                ))}
                                                <div className="relative group">
                                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-[15px] w-[15px] text-white/15 group-focus-within:text-primary-400/50 transition-colors" />
                                                    <input
                                                        type="date"
                                                        value={filters.departure_date}
                                                        onChange={(e) => setFilters({ departure_date: e.target.value })}
                                                        className="w-full h-[48px] bg-white/[0.03] border border-white/[0.06] rounded-xl pl-11 pr-4 text-[14px] text-white placeholder:text-white/15 focus:outline-none focus:bg-white/[0.05] focus:border-primary-400/25 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.08)] transition-all duration-300 [color-scheme:dark]"
                                                    />
                                                </div>

                                                {/* Premium CTA button */}
                                                <div className="relative group pt-1">
                                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-400 rounded-xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                                                    <Button
                                                        size="lg"
                                                        className="relative w-full h-[48px] bg-gradient-to-r from-primary-500 to-primary-400 text-white hover:from-primary-400 hover:to-primary-500 rounded-xl text-[14px] font-semibold shadow-[0_4px_24px_rgba(124,58,237,0.3)] transition-all duration-300"
                                                        asChild
                                                    >
                                                        <Link href={`/search/results?origin=${filters.origin}&destination=${filters.destination}&date=${filters.departure_date}&mode=${filters.mode}`}>
                                                            <Search className="h-4 w-4" />
                                                            Search {transportModes.find(m => m.mode === filters.mode)?.label || 'Routes'}
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Trust strip */}
                    <div className="relative z-10 pb-10 pt-4">
                        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
                            <motion.div
                                className="flex flex-wrap justify-center lg:justify-between gap-x-8 gap-y-3"
                                initial="hidden" animate="show" variants={stagger}
                            >
                                {trustSignals.map((item) => (
                                    <motion.div key={item.label} variants={fadeUp} className="flex items-center gap-2.5">
                                        <item.icon className="h-[13px] w-[13px] text-primary-400/30 shrink-0" />
                                        <span className="text-[12px] text-white/30 font-medium tracking-wide">{item.label}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══════════ TRANSPORT MODES ═══════════ */}
                <DarkSection bg="#0c0b18">
                    <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8">
                        <SectionHeader
                            eyebrow="How you travel"
                            title="Every mode, one platform"
                            subtitle="Search across flights, trains, buses, and ferries — all in a single search."
                        />
                        <motion.div
                            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-12"
                            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}
                        >
                            {transportModes.map((mode) => (
                                <motion.div key={mode.mode} variants={fadeUp}>
                                    <Link href={`/search?mode=${mode.mode}`}>
                                        <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer ring-1 ring-white/[0.06] hover:ring-primary-400/30 transition-all duration-500">
                                            {/* Background image */}
                                            <img
                                                src={mode.image}
                                                alt={mode.label}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                                                loading="lazy"
                                            />
                                            {/* Light overlay — lets photos show clearly */}
                                            <div className={`absolute inset-0 bg-gradient-to-t ${mode.accent}`} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#08080e]/80 via-transparent to-[#08080e]/10" />

                                            {/* Icon badge — top left */}
                                            <div className="absolute top-4 left-4">
                                                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-lg border border-white/15 flex items-center justify-center group-hover:bg-white/15 group-hover:border-white/25 transition-all duration-400 shadow-lg">
                                                    <mode.icon className="h-5 w-5 text-white" />
                                                </div>
                                            </div>

                                            {/* Arrow — top right */}
                                            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/0 group-hover:bg-white/10 flex items-center justify-center transition-all duration-400">
                                                <ArrowRight className="h-4 w-4 text-white/0 group-hover:text-white/80 transition-all duration-300" />
                                            </div>

                                            {/* Text — bottom */}
                                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                                <h3 className="font-display font-bold text-white text-[20px]" style={{ letterSpacing: '-0.2px' }}>{mode.label}</h3>
                                                <p className="text-[13px] text-white/50 mt-1 font-medium">{mode.desc}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </DarkSection>

                {/* ═══════════ TRENDING DESTINATIONS ═══════════ */}
                {trending.length > 0 && (
                    <DarkSection bg="#08080e">
                        <div className="absolute top-0 right-[8%] w-[600px] h-[600px] bg-primary-600/6 rounded-full blur-[160px]" />
                        <div className="relative max-w-[1240px] mx-auto px-5 sm:px-8">
                            <SectionHeader
                                eyebrow="Popular now"
                                title="Trending destinations"
                                subtitle="The most booked places across Southeast Asia this week."
                            >
                                <Link href="/destinations" className="hidden md:flex items-center gap-2 text-[13px] text-white/40 font-semibold hover:text-primary-400 transition-colors group shrink-0 pb-1">
                                    View all
                                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </SectionHeader>

                            <motion.div
                                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 mt-12"
                                initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger}
                            >
                                {trending.slice(0, 8).map((dest, i) => (
                                    <motion.div key={dest.id} variants={fadeUp}>
                                        <Link href={`/destinations/${dest.slug}`}>
                                            <div className="group relative cursor-pointer">
                                                {/* Hover glow border */}
                                                <div className="absolute -inset-[1px] rounded-[18px] bg-gradient-to-b from-primary-400/0 via-white/0 to-teal/0 group-hover:from-primary-400/30 group-hover:via-white/[0.08] group-hover:to-teal/20 transition-all duration-700 opacity-0 group-hover:opacity-100 blur-[0.5px]" />

                                                <div className="relative rounded-[18px] overflow-hidden aspect-[3/4] bg-[#12111e] group-hover:-translate-y-1 transition-transform duration-500 ease-out">
                                                    {/* Image */}
                                                    {dest.image_url ? (
                                                        <img
                                                            src={dest.image_url}
                                                            alt={`Travel to ${dest.name}, ${dest.country}`}
                                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[900ms] ease-out"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className={`absolute inset-0 bg-gradient-to-br ${
                                                            ['from-primary-500 to-primary-700', 'from-teal to-emerald-700', 'from-rose-500 to-pink-700', 'from-amber-500 to-orange-700',
                                                             'from-cyan-500 to-blue-700', 'from-fuchsia-500 to-purple-700', 'from-lime-500 to-green-700', 'from-sky-500 to-indigo-700'][i % 8]
                                                        }`} />
                                                    )}

                                                    {/* Subtle top vignette for badge readability */}
                                                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />
                                                    {/* Bottom content scrim */}
                                                    <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                                    {/* Trending badge */}
                                                    {dest.is_popular && (
                                                        <div className="absolute top-3.5 left-3.5 z-10">
                                                            <span className="bg-white/15 backdrop-blur-xl text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/15 shadow-lg">
                                                                <TrendingUp className="h-2.5 w-2.5 text-primary-300" /> Trending
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Price badge — top right, appears on hover */}
                                                    {dest.avg_price && (
                                                        <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
                                                            <span className="bg-primary-500/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-[0_4px_12px_rgba(124,58,237,0.4)]">
                                                                {formatCurrency(Number(dest.avg_price))}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Bottom content */}
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10">
                                                        <p className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.1em] mb-1">{dest.country}</p>
                                                        <h3 className="font-display font-bold text-white text-[20px] md:text-[22px] leading-[1.1]" style={{ letterSpacing: '-0.3px' }}>{dest.name}</h3>
                                                        {dest.avg_price && (
                                                            <div className="mt-3 inline-flex items-center gap-1.5 bg-primary-500/20 backdrop-blur-sm border border-primary-400/20 rounded-lg px-3 py-1">
                                                                <span className="text-[11px] text-white/50 font-medium">from</span>
                                                                <span className="text-[14px] text-white font-bold">{formatCurrency(Number(dest.avg_price))}</span>
                                                            </div>
                                                        )}

                                                        {/* Explore button — slides up on hover */}
                                                        <div className="mt-3 overflow-hidden h-0 group-hover:h-9 transition-all duration-500 ease-out">
                                                            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/80 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full">
                                                                Explore <ArrowRight className="h-3 w-3" />
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Subtle inner border for definition */}
                                                    <div className="absolute inset-0 rounded-[18px] ring-1 ring-inset ring-white/[0.06] group-hover:ring-white/[0.1] transition-all duration-500" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <div className="md:hidden mt-8 text-center">
                                <Link href="/destinations" className="text-white/40 font-semibold text-[13px] inline-flex items-center gap-1.5 hover:text-primary-400 transition-colors">
                                    View all destinations <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </div>
                    </DarkSection>
                )}

                {/* ═══════════ STATS ═══════════ */}
                <DarkSection bg="#0c0b18">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-primary-500/4 rounded-full blur-[160px]" />
                    <div className="relative max-w-[1100px] mx-auto px-5 sm:px-8">
                        <motion.div className="text-center mb-14" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
                            <SectionHeader
                                align="center"
                                eyebrow="By the numbers"
                                title="Trusted by travelers across the region"
                                subtitle="Real numbers. Real journeys. Real savings."
                            />
                        </motion.div>
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
                        >
                            <Counter target={stats.routes || 500} label="Routes" />
                            <Counter target={stats.destinations || 100} label="Destinations" />
                            <Counter target={stats.bookings || 10000} label="Bookings" />
                            <Counter target={stats.users || 5000} label="Travelers" />
                        </motion.div>
                    </div>
                </DarkSection>

                {/* ═══════════ FLASH DEALS ═══════════ */}
                {flashDeals.length > 0 && (
                    <DarkSection bg="#08080e">
                        <div className="absolute bottom-0 left-[12%] w-[500px] h-[500px] bg-teal/5 rounded-full blur-[140px]" />
                        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] bg-primary-500/4 rounded-full blur-[140px]" />
                        <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8">
                            <SectionHeader eyebrow="Limited time" title="Flash deals" subtitle="Grab these low fares before they disappear." />

                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12"
                                initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger}
                            >
                                {flashDeals.slice(0, 6).map((deal, idx) => {
                                    const ModeIcon = (transportModes.find(m => m.mode === deal.mode) || transportModes[0]).icon;
                                    const accentColors = ['from-violet-500 to-primary-500', 'from-teal to-emerald-500', 'from-rose-500 to-pink-500', 'from-amber-500 to-orange-500', 'from-sky-500 to-blue-500', 'from-fuchsia-500 to-purple-500'];
                                    return (
                                        <motion.div key={deal.id} variants={fadeUp}>
                                            <div className="group relative bg-white/[0.03] rounded-2xl border border-white/[0.06] hover:border-primary-400/20 transition-all duration-500 overflow-hidden group-hover:-translate-y-0.5">
                                                {/* Accent top bar */}
                                                <div className={`h-[3px] bg-gradient-to-r ${accentColors[idx % 6]} opacity-60`} />

                                                <div className="p-6">
                                                    {/* Header with price highlight */}
                                                    <div className="flex items-start justify-between mb-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.06] text-primary-400 border border-white/[0.06]">
                                                                <ModeIcon className="h-[18px] w-[18px]" />
                                                            </div>
                                                            <div>
                                                                <p className="text-[15px] font-semibold text-white">{deal.provider?.name}</p>
                                                                <p className="text-[12px] text-white/35 capitalize mt-0.5">{deal.mode}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="bg-gradient-to-r from-primary-500/15 to-teal/10 border border-primary-400/15 rounded-xl px-4 py-2">
                                                                <p className="text-[24px] font-display font-bold text-white leading-none">{formatCurrency(Number(deal.base_price))}</p>
                                                                <p className="text-[10px] text-white/30 uppercase tracking-wider mt-1">per person</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Route visualization */}
                                                    <div className="bg-white/[0.02] rounded-xl border border-white/[0.04] p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-[22px] font-display font-bold text-white leading-none">{deal.origin_code}</p>
                                                                <p className="text-[12px] text-white/35 truncate mt-1.5">{deal.origin_name}</p>
                                                            </div>
                                                            <div className="flex-1 flex flex-col items-center gap-1.5 px-2">
                                                                <span className="text-[10px] text-white/25 font-medium">{formatDuration(deal.duration_minutes)}</span>
                                                                <div className="w-full flex items-center gap-1">
                                                                    <div className="h-[1px] flex-1 bg-white/[0.08]" />
                                                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-400 to-teal shadow-[0_0_8px_rgba(124,58,237,0.4)]" />
                                                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-primary-400/30 to-teal/20" />
                                                                    <Plane className="h-3.5 w-3.5 text-teal -rotate-45" />
                                                                </div>
                                                                <span className="text-[10px] text-white/25 font-medium">{deal.stops === 0 ? 'Direct' : `${deal.stops} stop${deal.stops > 1 ? 's' : ''}`}</span>
                                                            </div>
                                                            <div className="flex-1 text-right min-w-0">
                                                                <p className="text-[22px] font-display font-bold text-white leading-none">{deal.destination_code}</p>
                                                                <p className="text-[12px] text-white/35 truncate mt-1.5">{deal.destination_name}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.05]">
                                                        <span className="flex items-center gap-2 text-[13px] text-white/30">
                                                            <Clock className="h-3.5 w-3.5" />
                                                            {formatDate(deal.departure_at)}
                                                        </span>
                                                        <div className="relative group/btn">
                                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-teal rounded-lg blur-sm opacity-0 group-hover/btn:opacity-40 transition-opacity duration-300" />
                                                            <Button size="sm" className="relative h-[34px] px-5 text-[13px] bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-none rounded-lg font-semibold hover:from-primary-400 hover:to-primary-500 transition-all" asChild>
                                                                <Link href={`/search/results?origin=${deal.origin_code}&destination=${deal.destination_code}&date=${deal.departure_at.split('T')[0]}&mode=${deal.mode}`}>
                                                                    Book now
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </DarkSection>
                )}

                {/* ═══════════ FEATURED DESTINATIONS ═══════════ */}
                {featured.length > 0 && (
                    <DarkSection bg="#0c0b18">
                        <div className="absolute top-[20%] left-[3%] w-[600px] h-[600px] bg-teal/4 rounded-full blur-[160px]" />
                        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-primary-500/4 rounded-full blur-[140px]" />
                        <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8">
                            <SectionHeader eyebrow="Editor's picks" title="Must-visit destinations" subtitle="Hand-picked by our travel experts for unforgettable experiences." />

                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12"
                                initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger}
                            >
                                {featured.slice(0, 4).map((dest, i) => (
                                    <motion.div key={dest.id} variants={scaleIn}>
                                        <Link href={`/destinations/${dest.slug}`}>
                                            <div className="group relative cursor-pointer">
                                                {/* Hover glow */}
                                                <div className="absolute -inset-[1px] rounded-[20px] bg-gradient-to-b from-primary-400/0 to-teal/0 group-hover:from-primary-400/25 group-hover:to-teal/15 transition-all duration-700 opacity-0 group-hover:opacity-100 blur-[0.5px]" />

                                                <div className={`relative rounded-[20px] overflow-hidden group-hover:-translate-y-1 transition-transform duration-500 ${i === 0 ? 'md:row-span-2 aspect-[4/5] md:aspect-auto md:h-full min-h-[300px]' : 'aspect-[2.1/1]'}`}>
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${['from-primary-500 to-primary-700', 'from-teal to-emerald-700', 'from-rose-500 to-pink-700', 'from-amber-500 to-orange-700'][i % 4]}`} />
                                                    {dest.image_url && (
                                                        <img src={dest.image_url} alt={`${dest.name} travel guide`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[900ms] ease-out" loading="lazy" />
                                                    )}
                                                    {/* Lighter overlay — let photos breathe */}
                                                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/25 to-transparent" />
                                                    <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                                                    {/* Featured badge */}
                                                    <div className="absolute top-4 left-4">
                                                        <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-xl text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/15 shadow-lg">
                                                            <Star className="h-2.5 w-2.5 text-amber-300" /> Featured
                                                        </span>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                                        <p className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.1em] mb-1.5">{dest.country}</p>
                                                        <h3 className="font-display font-bold text-white text-[1.5rem] md:text-[1.75rem] leading-[1.1]" style={{ letterSpacing: '-0.3px' }}>{dest.name}</h3>
                                                        {dest.description && i === 0 && (
                                                            <p className="text-white/35 text-[14px] mt-3 line-clamp-2 max-w-md leading-relaxed">{dest.description}</p>
                                                        )}
                                                        {dest.avg_price && (
                                                            <div className="mt-4 inline-flex items-center gap-2 bg-primary-500/20 backdrop-blur-sm border border-primary-400/20 rounded-lg px-4 py-1.5">
                                                                <span className="text-[12px] text-white/50 font-medium">Routes from</span>
                                                                <span className="text-[16px] text-white font-bold">{formatCurrency(Number(dest.avg_price))}</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Inner ring */}
                                                    <div className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/[0.06] group-hover:ring-white/[0.12] transition-all duration-500" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </DarkSection>
                )}

                {/* ═══════════ CTA BANNER ═══════════ */}
                <DarkSection bg="#08080e">
                    <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
                        <motion.div
                            className="relative rounded-[28px] overflow-hidden"
                            initial="hidden" whileInView="show" viewport={{ once: true }} variants={scaleIn}
                        >
                            {/* Rich layered background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1e1050] via-[#14102e] to-[#0b1520]" />
                            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                            <div className="absolute top-[-20%] right-[-5%] w-[600px] h-[600px] bg-primary-500/12 rounded-full blur-[140px]" />
                            <div className="absolute bottom-[-20%] left-[-5%] w-[500px] h-[500px] bg-teal/10 rounded-full blur-[140px]" />
                            {/* Border glow */}
                            <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/[0.08]" />

                            <div className="relative px-8 py-16 md:px-16 lg:px-20 md:py-24 flex flex-col md:flex-row items-center gap-12 md:gap-20">
                                <div className="flex-1">
                                    <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-primary-300/80 bg-primary-500/10 border border-primary-500/15 px-4 py-2 rounded-full mb-7">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-50" />
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal" />
                                        </span>
                                        Coming Soon
                                    </span>
                                    <h2 className="text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] leading-[1.05]" style={{ letterSpacing: '-0.5px' }}>
                                        <span className="font-serif font-bold text-white italic">Your journey,</span>
                                        <br />
                                        <span className="font-display font-bold bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent">in your pocket.</span>
                                    </h2>
                                    <p className="text-white/40 text-[16px] mt-6 max-w-[420px] leading-[1.7]">
                                        Download the Flyone app. Book on the go, get live updates,
                                        manage trips, and earn loyalty rewards — all from your phone.
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-9">
                                        <div className="relative group/btn">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-teal rounded-xl blur-sm opacity-40 group-hover/btn:opacity-70 transition-opacity duration-500" />
                                            <button className="relative h-12 px-7 bg-gradient-to-r from-primary-500 to-primary-400 text-white font-semibold text-[14px] rounded-xl shadow-none hover:from-primary-400 hover:to-primary-500 transition-all duration-300 flex items-center gap-2">
                                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                                                App Store
                                            </button>
                                        </div>
                                        <button className="h-12 px-7 bg-white/[0.06] text-white font-semibold text-[14px] rounded-xl border border-white/[0.1] hover:bg-white/[0.1] transition-all duration-300 flex items-center gap-2">
                                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                                            Google Play
                                        </button>
                                    </div>
                                </div>

                                {/* Phone mockup — richer visual */}
                                <div className="flex-shrink-0 hidden md:flex items-center justify-center">
                                    <div className="relative">
                                        {/* Outer glow */}
                                        <div className="absolute -inset-6 bg-gradient-to-br from-primary-500/10 to-teal/8 rounded-[40px] blur-2xl" />
                                        {/* Phone frame */}
                                        <div className="relative w-[180px] h-[340px] rounded-[36px] bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.1] backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                                            {/* Screen content mockup */}
                                            <div className="absolute inset-2 rounded-[28px] bg-[#0d0c1a] overflow-hidden">
                                                {/* Status bar */}
                                                <div className="flex items-center justify-between px-5 pt-3 pb-2">
                                                    <span className="text-[8px] text-white/40 font-medium">9:41</span>
                                                    <div className="flex gap-1">
                                                        <div className="w-3 h-1.5 rounded-sm bg-white/20" />
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                                    </div>
                                                </div>
                                                {/* App header */}
                                                <div className="px-4 pt-2 pb-3">
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-primary-400 to-primary-600" />
                                                        <span className="text-[9px] text-white/60 font-bold">Flyone</span>
                                                    </div>
                                                    <div className="w-20 h-1.5 rounded-full bg-white/10 mb-1.5" />
                                                    <div className="w-28 h-1.5 rounded-full bg-white/5" />
                                                </div>
                                                {/* Search card mini */}
                                                <div className="mx-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                                                    <div className="flex gap-2 mb-2">
                                                        {[1,2,3,4].map(n => <div key={n} className="flex-1 h-5 rounded-md bg-white/[0.04]" />)}
                                                    </div>
                                                    <div className="h-6 rounded-md bg-white/[0.04] mb-1.5" />
                                                    <div className="h-6 rounded-md bg-white/[0.04] mb-2" />
                                                    <div className="h-7 rounded-lg bg-gradient-to-r from-primary-500/40 to-primary-400/30" />
                                                </div>
                                                {/* Bottom cards */}
                                                <div className="flex gap-2 px-3 mt-3">
                                                    <div className="flex-1 h-16 rounded-lg bg-white/[0.03] border border-white/[0.04]" />
                                                    <div className="flex-1 h-16 rounded-lg bg-white/[0.03] border border-white/[0.04]" />
                                                </div>
                                            </div>
                                            {/* Notch */}
                                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-black" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </DarkSection>

                <Footer />
            </div>

            {flash.success && <Toast message={flash.success} type="success" visible={visible} onDismiss={dismiss} />}
            {flash.error && <Toast message={flash.error} type="error" visible={visible} onDismiss={dismiss} />}
        </>
    );
}
