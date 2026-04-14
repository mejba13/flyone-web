import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/Lib/utils';
import { MapPin, Search, TrendingUp, Star } from 'lucide-react';
import type { Destination, PaginatedData } from '@/Types';
import { useState } from 'react';

interface Props {
    destinations: PaginatedData<Destination>;
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Destinations({ destinations }: Props) {
    const [search, setSearch] = useState('');

    const filtered = destinations.data.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.country.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <MainLayout title="Destinations">
            {/* Hero header */}
            <div className="relative pt-12 pb-10 md:pt-16 md:pb-12 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-[-15%] right-[10%] w-[600px] h-[600px] bg-primary-500/6 rounded-full blur-[160px]" />
                    <div className="absolute bottom-[-10%] left-[5%] w-[400px] h-[400px] bg-teal/4 rounded-full blur-[140px]" />
                </div>
                <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 text-center">
                    <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.08em] uppercase text-primary-400 mb-4">
                        <MapPin className="h-3.5 w-3.5" /> Explore
                    </span>
                    <h1 className="text-[2.25rem] md:text-[3rem] font-display font-bold text-white" style={{ letterSpacing: '-0.4px' }}>
                        Explore Destinations
                    </h1>
                    <p className="text-white/35 text-[16px] mt-3 max-w-lg mx-auto">Discover amazing places across Southeast Asia and beyond</p>

                    <div className="max-w-md mx-auto mt-8 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15 group-focus-within:text-primary-400/50 transition-colors" />
                        <input
                            placeholder="Search destinations..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-12 bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:bg-white/[0.06] focus:border-primary-400/25 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.08)] transition-all duration-300"
                        />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="relative py-16">
                <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
                        initial="hidden" animate="show" variants={stagger}
                    >
                        {filtered.map((dest) => (
                            <motion.div key={dest.id} variants={fadeUp}>
                                <Link href={`/destinations/${dest.slug}`}>
                                    <div className="group relative cursor-pointer">
                                        <div className="absolute -inset-[1px] rounded-[18px] bg-gradient-to-b from-primary-400/0 to-teal/0 group-hover:from-primary-400/25 group-hover:to-teal/15 transition-all duration-700 opacity-0 group-hover:opacity-100 blur-[0.5px]" />
                                        <div className="relative rounded-[18px] overflow-hidden aspect-[3/4] bg-[#12111e] group-hover:-translate-y-1 transition-transform duration-500">
                                            {dest.image_url ? (
                                                <img src={dest.image_url} alt={dest.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out" loading="lazy" />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/40 to-teal/20 flex items-center justify-center">
                                                    <MapPin className="h-10 w-10 text-white/20" />
                                                </div>
                                            )}
                                            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/25 to-transparent" />
                                            <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

                                            {/* Badges */}
                                            <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                                                {dest.is_popular && (
                                                    <span className="bg-white/15 backdrop-blur-xl text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/15">
                                                        <TrendingUp className="h-2.5 w-2.5 text-primary-300" /> Popular
                                                    </span>
                                                )}
                                                {dest.is_featured && (
                                                    <span className="bg-white/15 backdrop-blur-xl text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/15">
                                                        <Star className="h-2.5 w-2.5 text-amber-300" /> Featured
                                                    </span>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                                                <p className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.08em] mb-1">{dest.country}</p>
                                                <h3 className="font-display font-bold text-white text-[18px] leading-tight" style={{ letterSpacing: '-0.2px' }}>{dest.name}</h3>
                                                {dest.avg_price && (
                                                    <div className="mt-2.5 inline-flex items-center gap-1.5 bg-primary-500/20 backdrop-blur-sm border border-primary-400/20 rounded-lg px-2.5 py-0.5">
                                                        <span className="text-[10px] text-white/50 font-medium">from</span>
                                                        <span className="text-[13px] text-white font-bold">{formatCurrency(dest.avg_price)}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="absolute inset-0 rounded-[18px] ring-1 ring-inset ring-white/[0.06] group-hover:ring-white/[0.1] transition-all duration-500" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {filtered.length === 0 && (
                        <div className="text-center py-20">
                            <MapPin className="h-12 w-12 text-white/10 mx-auto mb-4" />
                            <p className="text-white/30 text-[16px]">No destinations found matching "{search}"</p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
