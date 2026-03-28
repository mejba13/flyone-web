import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Input } from '@/Components/ui/input';
import { motion } from 'framer-motion';
import { useSearchStore } from '@/Stores/searchStore';
import { formatCurrency, formatDate, formatDuration } from '@/Lib/utils';
import {
    Plane, Train, Bus, Ship, Search, ArrowRight, Star,
    MapPin, TrendingUp, Sparkles, Shield, Clock, Users,
    ChevronRight, Calendar,
} from 'lucide-react';
import type { Route, Destination } from '@/Types';

interface Props {
    trending: Destination[];
    featured: Destination[];
    flashDeals: Route[];
    stats: { routes: number; destinations: number; bookings: number; users: number };
}

const transportModes = [
    { icon: Plane, label: 'Flights', mode: 'flight', color: 'bg-primary-100 text-primary-600' },
    { icon: Train, label: 'Trains', mode: 'train', color: 'bg-teal/10 text-teal-dark' },
    { icon: Bus, label: 'Buses', mode: 'bus', color: 'bg-warning/10 text-warning' },
    { icon: Ship, label: 'Ferries', mode: 'ferry', color: 'bg-info/10 text-info' },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

function AnimatedCounter({ value, label }: { value: number; label: string }) {
    return (
        <div className="text-center">
            <motion.p
                className="text-3xl md:text-4xl font-display font-bold text-white"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {value.toLocaleString()}+
            </motion.p>
            <p className="text-primary-200 text-sm mt-1">{label}</p>
        </div>
    );
}

export default function Landing({ trending, featured, flashDeals, stats }: Props) {
    const { filters, setFilters } = useSearchStore();

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-deep via-deep-light to-primary-600 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal rounded-full blur-3xl" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                    <motion.div
                        className="text-center max-w-3xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge variant="premium" className="mb-4 text-sm px-4 py-1.5">New: Multi-city booking</Badge>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                            Your journey starts<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-teal">with a single search</span>
                        </h1>
                        <p className="text-lg text-primary-200 max-w-xl mx-auto">
                            Flights, trains, buses, and ferries — compare and book across Southeast Asia and beyond.
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        className="max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card className="p-2 shadow-xl">
                            <CardContent className="p-4">
                                <div className="flex flex-wrap gap-3 mb-4">
                                    {transportModes.map((mode) => (
                                        <button
                                            key={mode.mode}
                                            onClick={() => setFilters({ mode: mode.mode })}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                                filters.mode === mode.mode
                                                    ? mode.color + ' shadow-sm'
                                                    : 'text-deep-lighter hover:bg-soft'
                                            }`}
                                        >
                                            <mode.icon className="h-4 w-4" />
                                            {mode.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                    <Input
                                        placeholder="From where?"
                                        icon={<MapPin className="h-4 w-4" />}
                                        value={filters.origin}
                                        onChange={(e) => setFilters({ origin: e.target.value })}
                                    />
                                    <Input
                                        placeholder="To where?"
                                        icon={<MapPin className="h-4 w-4" />}
                                        value={filters.destination}
                                        onChange={(e) => setFilters({ destination: e.target.value })}
                                    />
                                    <Input
                                        type="date"
                                        icon={<Calendar className="h-4 w-4" />}
                                        value={filters.departure_date}
                                        onChange={(e) => setFilters({ departure_date: e.target.value })}
                                    />
                                    <Button size="lg" className="w-full" asChild>
                                        <Link
                                            href={`/search/results?origin=${filters.origin}&destination=${filters.destination}&date=${filters.departure_date}&mode=${filters.mode}`}
                                        >
                                            <Search className="h-4 w-4" />
                                            Search
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Transport Category Icons */}
            <section className="py-12 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {transportModes.map((mode, i) => (
                            <motion.div key={mode.mode} variants={item} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                                <Link href={`/search?mode=${mode.mode}`}>
                                    <Card className="p-6 text-center hover:scale-[1.02] transition-transform cursor-pointer group">
                                        <div className={`w-14 h-14 ${mode.color} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                                            <mode.icon className="h-7 w-7" />
                                        </div>
                                        <h3 className="font-display font-semibold text-deep">{mode.label}</h3>
                                        <p className="text-sm text-deep-lighter mt-1">Book {mode.label.toLowerCase()}</p>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Destinations */}
            {trending.length > 0 && (
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-deep">Trending Destinations</h2>
                                <p className="text-deep-lighter mt-1">Most popular places to explore right now</p>
                            </div>
                            <Link href="/destinations" className="text-primary-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                View all <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            {trending.slice(0, 8).map((dest) => (
                                <motion.div key={dest.id} variants={item}>
                                    <Link href={`/destinations/${dest.slug}`}>
                                        <Card className="overflow-hidden group cursor-pointer">
                                            <div className="relative h-48 bg-gradient-to-br from-primary-200 to-teal/30 overflow-hidden">
                                                {dest.image_url ? (
                                                    <img src={dest.image_url} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <MapPin className="h-12 w-12 text-primary-400" />
                                                    </div>
                                                )}
                                                {dest.is_popular && (
                                                    <Badge variant="amber" className="absolute top-3 left-3">Popular</Badge>
                                                )}
                                            </div>
                                            <CardContent className="p-4">
                                                <h3 className="font-display font-semibold text-deep">{dest.name}</h3>
                                                <p className="text-sm text-deep-lighter">{dest.country}</p>
                                                {dest.avg_price && (
                                                    <p className="text-sm font-medium text-primary-600 mt-2">
                                                        From {formatCurrency(dest.avg_price)}
                                                    </p>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Flash Deals */}
            {flashDeals.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-error/10 rounded-xl flex items-center justify-center">
                                <Sparkles className="h-5 w-5 text-error" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-deep">Flash Deals</h2>
                                <p className="text-deep-lighter">Limited-time offers you don't want to miss</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {flashDeals.map((deal) => (
                                <Card key={deal.id} className="p-5 hover:scale-[1.01] transition-transform">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            {deal.provider?.logo_url ? (
                                                <img src={deal.provider.logo_url} alt={deal.provider.name} className="h-8 w-8 rounded" />
                                            ) : (
                                                <div className="h-8 w-8 bg-primary-100 rounded flex items-center justify-center text-primary-600 text-xs font-bold">
                                                    {deal.provider?.name?.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm font-medium">{deal.provider?.name}</p>
                                                <p className="text-xs text-deep-lighter capitalize">{deal.mode}</p>
                                            </div>
                                        </div>
                                        <Badge variant="error">{formatCurrency(deal.base_price)}</Badge>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="font-display font-semibold">{deal.origin_code}</p>
                                            <p className="text-xs text-deep-lighter">{deal.origin_name}</p>
                                        </div>
                                        <div className="flex-1 flex items-center gap-1">
                                            <div className="h-px flex-1 bg-soft-dark" />
                                            <ArrowRight className="h-4 w-4 text-deep-lighter" />
                                            <div className="h-px flex-1 bg-soft-dark" />
                                        </div>
                                        <div className="text-right">
                                            <p className="font-display font-semibold">{deal.destination_code}</p>
                                            <p className="text-xs text-deep-lighter">{deal.destination_name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-soft-dark/50">
                                        <div className="flex items-center gap-3 text-xs text-deep-lighter">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {formatDate(deal.departure_at)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {formatDuration(deal.duration_minutes)}
                                            </span>
                                        </div>
                                        <Button size="sm" variant="secondary" asChild>
                                            <Link href={`/search/results?origin=${deal.origin_code}&destination=${deal.destination_code}&date=${deal.departure_at.split('T')[0]}&mode=${deal.mode}`}>
                                                Book
                                            </Link>
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Social Proof Counter */}
            <section className="py-16 bg-gradient-to-r from-deep to-primary-600">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <AnimatedCounter value={stats.routes || 500} label="Routes Available" />
                        <AnimatedCounter value={stats.destinations || 100} label="Destinations" />
                        <AnimatedCounter value={stats.bookings || 10000} label="Bookings Made" />
                        <AnimatedCounter value={stats.users || 5000} label="Happy Travelers" />
                    </div>
                </div>
            </section>

            {/* Why Flyone */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-deep">Why travelers choose Flyone</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Shield, title: 'Secure Booking', desc: 'Protected payments and instant confirmation for every trip.' },
                            { icon: TrendingUp, title: 'Best Prices', desc: 'Compare across providers to find the best deals instantly.' },
                            { icon: Users, title: 'Loyalty Rewards', desc: 'Earn points on every booking and unlock exclusive perks.' },
                        ].map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                            >
                                <Card className="p-8 text-center h-full">
                                    <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <feature.icon className="h-7 w-7 text-primary-600" />
                                    </div>
                                    <h3 className="font-display font-semibold text-deep text-lg mb-2">{feature.title}</h3>
                                    <p className="text-deep-lighter text-sm leading-relaxed">{feature.desc}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* App Download CTA */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-8 md:p-12 border-0">
                        <div className="max-w-2xl">
                            <Badge className="bg-white/20 text-white mb-4">Coming Soon</Badge>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Get the Flyone app</h2>
                            <p className="text-primary-100 text-lg mb-6">
                                Book on the go, get real-time updates, and manage your trips from anywhere.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50">
                                    App Store
                                </Button>
                                <Button size="lg" variant="secondary" className="border-white/30 text-white hover:bg-white/10">
                                    Google Play
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </MainLayout>
    );
}
