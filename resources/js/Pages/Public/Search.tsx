import { useState } from 'react';
import { router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Button } from '@/Components/ui/button';
import { useSearchStore } from '@/Stores/searchStore';
import { motion } from 'framer-motion';
import {
    Search as SearchIcon, MapPin, Calendar, Users, ArrowLeftRight,
    Plane, Train, Bus, Ship, Sparkles,
} from 'lucide-react';

const modes = [
    { key: 'flight', icon: Plane, label: 'Flights', activeColor: 'bg-violet-500/15 text-violet-300 border-violet-500/25 shadow-[0_0_12px_rgba(139,92,246,0.2)]', iconColor: 'text-violet-400' },
    { key: 'train', icon: Train, label: 'Trains', activeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.2)]', iconColor: 'text-emerald-400' },
    { key: 'bus', icon: Bus, label: 'Buses', activeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.2)]', iconColor: 'text-amber-400' },
    { key: 'ferry', icon: Ship, label: 'Ferries', activeColor: 'bg-sky-500/15 text-sky-300 border-sky-500/25 shadow-[0_0_12px_rgba(14,165,233,0.2)]', iconColor: 'text-sky-400' },
];
const modeLabels: Record<string, string> = { flight: 'Flights', train: 'Trains', bus: 'Buses', ferry: 'Ferries' };

const inputClass = 'w-full h-12 bg-white/[0.03] border border-white/[0.07] rounded-xl pl-11 pr-4 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:bg-white/[0.05] focus:border-primary-400/25 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.08)] transition-all duration-300';

export default function Search() {
    const { filters, setFilters } = useSearchStore();
    const [tripType, setTripType] = useState<string>(filters.trip_type);

    const handleSearch = () => {
        router.get('/search/results', {
            origin: filters.origin,
            destination: filters.destination,
            date: filters.departure_date,
            return_date: filters.return_date,
            mode: filters.mode,
            class: filters.class,
            passengers: filters.passengers,
        });
    };

    const swapLocations = () => {
        setFilters({ origin: filters.destination, destination: filters.origin });
    };

    return (
        <MainLayout title="Search">
            <div className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden">
                {/* Background atmosphere */}
                <div className="absolute inset-0">
                    <div className="absolute top-[-10%] right-[5%] w-[600px] h-[600px] bg-primary-500/8 rounded-full blur-[160px]" />
                    <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-teal/5 rounded-full blur-[140px]" />
                    <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
                </div>

                <div className="relative max-w-[780px] mx-auto px-5 sm:px-8 w-full py-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        {/* Header */}
                        <div className="text-center mb-10">
                            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.08em] uppercase text-primary-400 mb-4">
                                <Sparkles className="h-3.5 w-3.5" />
                                Multi-modal search
                            </span>
                            <h1 className="text-[2rem] md:text-[2.75rem] font-display font-bold text-white" style={{ letterSpacing: '-0.4px' }}>
                                Search for your next adventure
                            </h1>
                            <p className="text-white/35 text-[16px] mt-3">Compare flights, trains, buses, and ferries in one search</p>
                        </div>

                        {/* Search card */}
                        <div className="relative">
                            <div className="absolute -inset-1 rounded-[24px] bg-gradient-to-br from-primary-500/15 via-transparent to-teal/10 blur-lg opacity-60" />
                            <div className="relative bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-6 sm:p-8 shadow-[0_12px_48px_rgba(0,0,0,0.4)]">

                                {/* Mode selection — colorful icons */}
                                <div className="flex gap-2 mb-7 flex-wrap">
                                    {modes.map((m) => (
                                        <button
                                            key={m.key}
                                            onClick={() => setFilters({ mode: m.key })}
                                            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[13px] font-semibold border transition-all duration-300 ${
                                                filters.mode === m.key
                                                    ? m.activeColor
                                                    : 'bg-white/[0.03] text-white/40 border-white/[0.05] hover:text-white/60 hover:border-white/[0.1]'
                                            }`}
                                        >
                                            <m.icon className={`h-4 w-4 ${filters.mode === m.key ? '' : m.iconColor}`} />
                                            {m.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Trip type tabs */}
                                <div className="flex gap-1 p-1 bg-white/[0.03] border border-white/[0.04] rounded-xl mb-7 max-w-sm">
                                    {[
                                        { value: 'one_way', label: 'One Way' },
                                        { value: 'round_trip', label: 'Round Trip' },
                                        { value: 'multi_city', label: 'Multi-City' },
                                    ].map((tab) => (
                                        <button
                                            key={tab.value}
                                            onClick={() => { setTripType(tab.value); setFilters({ trip_type: tab.value as 'one_way' | 'round_trip' | 'multi_city' }); }}
                                            className={`flex-1 py-2 rounded-lg text-[12px] font-medium transition-all duration-200 ${
                                                tripType === tab.value
                                                    ? 'bg-white/[0.1] text-white shadow-sm'
                                                    : 'text-white/30 hover:text-white/50'
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Search fields */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-center">
                                        <div className="relative group">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15 group-focus-within:text-primary-400/50 transition-colors" />
                                            <input placeholder="From — City or airport" value={filters.origin} onChange={(e) => setFilters({ origin: e.target.value })} className={inputClass} />
                                        </div>
                                        <button onClick={swapLocations} className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] hover:border-primary-400/20 transition-all mx-auto">
                                            <ArrowLeftRight className="h-4 w-4 text-white/30" />
                                        </button>
                                        <div className="relative group">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15 group-focus-within:text-primary-400/50 transition-colors" />
                                            <input placeholder="To — City or airport" value={filters.destination} onChange={(e) => setFilters({ destination: e.target.value })} className={inputClass} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div className="relative group">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15 group-focus-within:text-primary-400/50 transition-colors" />
                                            <input type="date" value={filters.departure_date} onChange={(e) => setFilters({ departure_date: e.target.value })} className={`${inputClass} [color-scheme:dark]`} />
                                        </div>
                                        {tripType === 'round_trip' && (
                                            <div className="relative group">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15 group-focus-within:text-primary-400/50 transition-colors" />
                                                <input type="date" value={filters.return_date || ''} onChange={(e) => setFilters({ return_date: e.target.value })} placeholder="Return" className={`${inputClass} [color-scheme:dark]`} />
                                            </div>
                                        )}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="relative group">
                                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15 group-focus-within:text-primary-400/50 transition-colors" />
                                                <select
                                                    value={String(filters.passengers)}
                                                    onChange={(e) => setFilters({ passengers: Number(e.target.value) })}
                                                    className={`${inputClass} appearance-none`}
                                                >
                                                    {[1,2,3,4,5,6,7,8,9].map((n) => (
                                                        <option key={n} value={n} className="bg-[#12111e] text-white">{n} {n === 1 ? 'Pax' : 'Pax'}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <select
                                                value={filters.class}
                                                onChange={(e) => setFilters({ class: e.target.value })}
                                                className={`${inputClass} appearance-none px-4`}
                                            >
                                                <option value="economy" className="bg-[#12111e] text-white">Economy</option>
                                                <option value="premium_economy" className="bg-[#12111e] text-white">Premium</option>
                                                <option value="business" className="bg-[#12111e] text-white">Business</option>
                                                <option value="first" className="bg-[#12111e] text-white">First</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Search button */}
                                <div className="relative group mt-6">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-400 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                                    <Button
                                        onClick={handleSearch}
                                        className="relative w-full h-12 bg-gradient-to-r from-primary-500 to-primary-400 text-white hover:from-primary-400 hover:to-primary-500 rounded-xl text-[15px] font-semibold shadow-none transition-all duration-300"
                                    >
                                        <SearchIcon className="h-5 w-5" />
                                        Search {modeLabels[filters.mode] || 'routes'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}
