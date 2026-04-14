import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Button } from '@/Components/ui/button';
import { motion } from 'framer-motion';
import { formatCurrency, formatTime, formatDuration } from '@/Lib/utils';
import {
    ArrowRight, SlidersHorizontal,
    Plane, Train, Bus, Ship, X,
} from 'lucide-react';
import type { Route, PaginatedData } from '@/Types';

interface Props {
    routes: PaginatedData<Route>;
    filters: Record<string, string>;
}

const modeIcons: Record<string, typeof Plane> = { flight: Plane, train: Train, bus: Bus, ferry: Ship };

function RouteCard({ route, index }: { route: Route; index: number }) {
    const ModeIcon = modeIcons[route.mode] || Plane;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6 hover:border-primary-400/15 hover:bg-white/[0.04] transition-all duration-400">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Provider */}
                    <div className="flex items-center gap-3 lg:w-44 shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center">
                            {route.provider?.logo_url ? (
                                <img src={route.provider.logo_url} alt={route.provider.name} className="h-6 w-6 rounded" />
                            ) : (
                                <ModeIcon className="h-5 w-5 text-primary-400" />
                            )}
                        </div>
                        <div>
                            <p className="font-semibold text-[14px] text-white">{route.provider?.name}</p>
                            <p className="text-[12px] text-white/30">{route.route_number}</p>
                        </div>
                    </div>

                    {/* Route */}
                    <div className="flex-1 flex items-center gap-4">
                        <div className="text-center">
                            <p className="text-[20px] font-display font-bold text-white">{formatTime(route.departure_at)}</p>
                            <p className="text-[12px] text-white/40 font-medium">{route.origin_code}</p>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-1.5">
                            <p className="text-[11px] text-white/25 font-medium">{formatDuration(route.duration_minutes)}</p>
                            <div className="w-full flex items-center gap-1">
                                <div className="h-[1px] flex-1 bg-white/[0.08]" />
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-400/80" />
                                <div className="h-[1px] flex-1 bg-primary-400/20" />
                                <ModeIcon className="h-3 w-3 text-primary-400/50 -rotate-45" />
                            </div>
                            <p className="text-[11px] text-white/25">
                                {route.stops === 0 ? 'Direct' : `${route.stops} stop${route.stops > 1 ? 's' : ''}`}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-[20px] font-display font-bold text-white">{formatTime(route.arrival_at)}</p>
                            <p className="text-[12px] text-white/40 font-medium">{route.destination_code}</p>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 lg:w-24">
                        {route.stops === 0 && (
                            <span className="text-[10px] font-bold text-teal bg-teal/10 border border-teal/15 px-2 py-0.5 rounded-full">Direct</span>
                        )}
                        {route.available_seats <= 5 && (
                            <span className="text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/15 px-2 py-0.5 rounded-full">{route.available_seats} left</span>
                        )}
                    </div>

                    {/* Price & Book */}
                    <div className="lg:w-40 text-right shrink-0">
                        <div className="inline-flex items-center gap-1.5 bg-primary-500/15 border border-primary-400/15 rounded-xl px-4 py-2 mb-2">
                            <p className="text-[22px] font-display font-bold text-white leading-none">
                                {formatCurrency(route.base_price, route.currency)}
                            </p>
                        </div>
                        <p className="text-[11px] text-white/25 mb-3">per person</p>
                        <div className="relative group/btn">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-teal rounded-lg blur-sm opacity-0 group-hover/btn:opacity-30 transition-opacity duration-300" />
                            <Button size="sm" className="relative w-full h-9 bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-none rounded-lg text-[13px] font-semibold hover:from-primary-400 hover:to-primary-500 transition-all" asChild>
                                <Link href={`/booking/passengers?route_id=${route.id}`}>Select</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function SearchResults({ routes, filters }: Props) {
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState(filters.sort || 'base_price');

    const handleSort = (value: string) => {
        setSortBy(value);
        router.get('/search/results', { ...filters, sort: value }, { preserveState: true });
    };

    return (
        <MainLayout title="Search Results">
            <div className="min-h-[calc(100vh-72px)]">
                {/* Summary bar */}
                <div className="border-b border-white/[0.05] bg-[#0c0b18]/80 backdrop-blur-xl">
                    <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-4">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-3">
                                <span className="font-display font-bold text-white text-[16px]">{filters.origin}</span>
                                <ArrowRight className="h-4 w-4 text-primary-400/50" />
                                <span className="font-display font-bold text-white text-[16px]">{filters.destination}</span>
                                {filters.date && <span className="text-[13px] text-white/30 ml-2">{filters.date}</span>}
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-[13px] text-white/30">{routes.meta?.total || routes.data?.length || 0} results</p>
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="h-9 px-4 flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-lg text-[13px] text-white/50 font-medium hover:bg-white/[0.07] hover:border-white/[0.1] transition-all"
                                >
                                    <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                                </button>
                                <select
                                    value={sortBy}
                                    onChange={(e) => handleSort(e.target.value)}
                                    className="h-9 px-3 bg-white/[0.04] border border-white/[0.07] rounded-lg text-[13px] text-white/50 font-medium appearance-none focus:outline-none hover:bg-white/[0.07] transition-all"
                                >
                                    <option value="base_price" className="bg-[#12111e] text-white">Price: Low to High</option>
                                    <option value="departure_at" className="bg-[#12111e] text-white">Departure Time</option>
                                    <option value="duration_minutes" className="bg-[#12111e] text-white">Duration</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-6">
                    <div className="flex gap-6">
                        {/* Filter sidebar */}
                        {showFilters && (
                            <motion.aside
                                className="w-72 shrink-0 hidden lg:block"
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                            >
                                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 sticky top-24">
                                    <div className="flex items-center justify-between mb-5">
                                        <h3 className="font-display font-semibold text-white text-[15px]">Filters</h3>
                                        <button onClick={() => setShowFilters(false)} className="text-white/30 hover:text-white/60 transition-colors">
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-[13px] font-medium text-white/50 mb-2 block">Price Range</label>
                                            <div className="flex gap-2">
                                                <input type="number" placeholder="Min" className="flex-1 h-9 bg-white/[0.03] border border-white/[0.07] rounded-lg px-3 text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-primary-400/25 transition-all" />
                                                <input type="number" placeholder="Max" className="flex-1 h-9 bg-white/[0.03] border border-white/[0.07] rounded-lg px-3 text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-primary-400/25 transition-all" />
                                            </div>
                                        </div>
                                        <div className="h-[1px] bg-white/[0.05]" />
                                        <div>
                                            <label className="text-[13px] font-medium text-white/50 mb-3 block">Stops</label>
                                            <div className="space-y-2.5">
                                                {['Direct only', '1 stop max', '2 stops max'].map((opt, i) => (
                                                    <label key={opt} className="flex items-center gap-2.5 text-[13px] text-white/40 cursor-pointer hover:text-white/60 transition-colors">
                                                        <input type="radio" name="stops" value={i} className="accent-primary-500" />
                                                        {opt}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="h-[1px] bg-white/[0.05]" />
                                        <div>
                                            <label className="text-[13px] font-medium text-white/50 mb-3 block">Class</label>
                                            <div className="space-y-2.5">
                                                {['Economy', 'Premium Economy', 'Business', 'First'].map((cls) => (
                                                    <label key={cls} className="flex items-center gap-2.5 text-[13px] text-white/40 cursor-pointer hover:text-white/60 transition-colors">
                                                        <input type="checkbox" className="accent-primary-500 rounded" />
                                                        {cls}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <Button className="w-full h-9 bg-primary-500/15 text-primary-300 border border-primary-500/15 shadow-none rounded-lg text-[13px] font-semibold hover:bg-primary-500/25 transition-all">
                                            Apply Filters
                                        </Button>
                                    </div>
                                </div>
                            </motion.aside>
                        )}

                        {/* Results */}
                        <div className="flex-1 space-y-3">
                            {routes.data && routes.data.length > 0 ? (
                                routes.data.map((route, i) => (
                                    <RouteCard key={route.id} route={route} index={i} />
                                ))
                            ) : (
                                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-12 text-center">
                                    <div className="w-16 h-16 bg-white/[0.04] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Plane className="h-8 w-8 text-white/15" />
                                    </div>
                                    <h3 className="font-display font-semibold text-white text-[18px] mb-2">No routes found</h3>
                                    <p className="text-white/35 text-[14px]">Try adjusting your search criteria or dates.</p>
                                    <Button className="mt-5 bg-primary-500/15 text-primary-300 border border-primary-500/15 shadow-none rounded-lg font-semibold hover:bg-primary-500/25 transition-all" asChild>
                                        <Link href="/search">New Search</Link>
                                    </Button>
                                </div>
                            )}

                            {routes.meta && routes.meta.last_page > 1 && (
                                <div className="flex justify-center gap-3 pt-6">
                                    {routes.links?.prev && (
                                        <Button className="h-9 bg-white/[0.04] border border-white/[0.07] text-white/50 shadow-none rounded-lg hover:bg-white/[0.07] transition-all" asChild>
                                            <Link href={routes.links.prev}>Previous</Link>
                                        </Button>
                                    )}
                                    <span className="flex items-center px-3 text-[13px] text-white/30">
                                        Page {routes.meta.current_page} of {routes.meta.last_page}
                                    </span>
                                    {routes.links?.next && (
                                        <Button className="h-9 bg-white/[0.04] border border-white/[0.07] text-white/50 shadow-none rounded-lg hover:bg-white/[0.07] transition-all" asChild>
                                            <Link href={routes.links.next}>Next</Link>
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
