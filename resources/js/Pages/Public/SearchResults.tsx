import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Skeleton } from '@/Components/ui/skeleton';
import { Separator } from '@/Components/ui/separator';
import { motion } from 'framer-motion';
import { formatCurrency, formatTime, formatDuration, cn } from '@/Lib/utils';
import {
    ArrowRight, Clock, Filter, Star, SlidersHorizontal,
    Plane, Train, Bus, Ship, ChevronDown, X,
} from 'lucide-react';
import type { Route, PaginatedData } from '@/Types';

interface Props {
    routes: PaginatedData<Route>;
    filters: Record<string, any>;
}

const modeIcons: Record<string, typeof Plane> = { flight: Plane, train: Train, bus: Bus, ferry: Ship };

function RouteCard({ route, index }: { route: Route; index: number }) {
    const ModeIcon = modeIcons[route.mode] || Plane;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <Card className="p-5 hover:shadow-card-hover transition-all group">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Provider Info */}
                    <div className="flex items-center gap-3 lg:w-40 shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                            {route.provider?.logo_url ? (
                                <img src={route.provider.logo_url} alt={route.provider.name} className="h-6 w-6 rounded" />
                            ) : (
                                <ModeIcon className="h-5 w-5 text-primary-600" />
                            )}
                        </div>
                        <div>
                            <p className="font-medium text-sm">{route.provider?.name}</p>
                            <p className="text-xs text-deep-lighter">{route.route_number}</p>
                        </div>
                    </div>

                    {/* Route Details */}
                    <div className="flex-1 flex items-center gap-4">
                        <div className="text-center">
                            <p className="text-xl font-display font-bold">{formatTime(route.departure_at)}</p>
                            <p className="text-xs text-deep-lighter font-medium">{route.origin_code}</p>
                        </div>

                        <div className="flex-1 flex flex-col items-center gap-1">
                            <p className="text-xs text-deep-lighter">{formatDuration(route.duration_minutes)}</p>
                            <div className="w-full flex items-center gap-1">
                                <div className="h-px flex-1 bg-soft-dark" />
                                <ModeIcon className="h-3 w-3 text-deep-lighter" />
                                <div className="h-px flex-1 bg-soft-dark" />
                            </div>
                            <p className="text-xs text-deep-lighter">
                                {route.stops === 0 ? 'Direct' : `${route.stops} stop${route.stops > 1 ? 's' : ''}`}
                            </p>
                        </div>

                        <div className="text-center">
                            <p className="text-xl font-display font-bold">{formatTime(route.arrival_at)}</p>
                            <p className="text-xs text-deep-lighter font-medium">{route.destination_code}</p>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 lg:w-24">
                        {route.stops === 0 && <Badge variant="teal" className="text-[10px]">Direct</Badge>}
                        {route.available_seats <= 5 && <Badge variant="error" className="text-[10px]">{route.available_seats} left</Badge>}
                    </div>

                    {/* Price & Book */}
                    <div className="lg:w-36 text-right shrink-0">
                        <p className="text-2xl font-display font-bold text-primary-600">
                            {formatCurrency(route.base_price, route.currency)}
                        </p>
                        <p className="text-xs text-deep-lighter mb-2">per person</p>
                        <Button size="sm" className="w-full" asChild>
                            <Link href={`/booking/passengers?route_id=${route.id}`}>
                                Select
                            </Link>
                        </Button>
                    </div>
                </div>
            </Card>
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
            <div className="bg-soft min-h-screen">
                {/* Search Summary Bar */}
                <div className="bg-white border-b border-soft-dark/50 py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-3">
                                <span className="font-display font-semibold">{filters.origin}</span>
                                <ArrowRight className="h-4 w-4 text-deep-lighter" />
                                <span className="font-display font-semibold">{filters.destination}</span>
                                {filters.date && (
                                    <span className="text-sm text-deep-lighter ml-2">{filters.date}</span>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-sm text-deep-lighter">{routes.meta?.total || routes.data?.length || 0} results</p>
                                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                                    <SlidersHorizontal className="h-4 w-4" />
                                    Filters
                                </Button>
                                <Select value={sortBy} onValueChange={handleSort}>
                                    <SelectTrigger className="w-40 h-9">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="base_price">Price: Low to High</SelectItem>
                                        <SelectItem value="departure_at">Departure Time</SelectItem>
                                        <SelectItem value="duration_minutes">Duration</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex gap-6">
                        {/* Filter Sidebar */}
                        {showFilters && (
                            <motion.aside
                                className="w-72 shrink-0 hidden lg:block"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <Card className="p-5 sticky top-24">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-display font-semibold">Filters</h3>
                                        <button onClick={() => setShowFilters(false)} className="text-deep-lighter hover:text-deep">
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="space-y-5">
                                        <div>
                                            <label className="text-sm font-medium text-deep mb-2 block">Price Range</label>
                                            <div className="flex gap-2">
                                                <Input type="number" placeholder="Min" className="h-9" />
                                                <Input type="number" placeholder="Max" className="h-9" />
                                            </div>
                                        </div>

                                        <Separator />

                                        <div>
                                            <label className="text-sm font-medium text-deep mb-2 block">Stops</label>
                                            <div className="space-y-2">
                                                {['Direct only', '1 stop max', '2 stops max'].map((opt, i) => (
                                                    <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
                                                        <input type="radio" name="stops" value={i} className="accent-primary-500" />
                                                        {opt}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <Separator />

                                        <div>
                                            <label className="text-sm font-medium text-deep mb-2 block">Class</label>
                                            <div className="space-y-2">
                                                {['Economy', 'Premium Economy', 'Business', 'First'].map((cls) => (
                                                    <label key={cls} className="flex items-center gap-2 text-sm cursor-pointer">
                                                        <input type="checkbox" className="accent-primary-500 rounded" />
                                                        {cls}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <Button variant="secondary" size="sm" className="w-full">
                                            Apply Filters
                                        </Button>
                                    </div>
                                </Card>
                            </motion.aside>
                        )}

                        {/* Results */}
                        <div className="flex-1 space-y-3">
                            {routes.data && routes.data.length > 0 ? (
                                routes.data.map((route, i) => (
                                    <RouteCard key={route.id} route={route} index={i} />
                                ))
                            ) : (
                                <Card className="p-12 text-center">
                                    <div className="w-16 h-16 bg-soft-dark rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Plane className="h-8 w-8 text-deep-lighter" />
                                    </div>
                                    <h3 className="font-display font-semibold text-lg mb-2">No routes found</h3>
                                    <p className="text-deep-lighter">Try adjusting your search criteria or dates.</p>
                                    <Button variant="secondary" className="mt-4" asChild>
                                        <Link href="/search">New Search</Link>
                                    </Button>
                                </Card>
                            )}

                            {/* Pagination */}
                            {routes.meta && routes.meta.last_page > 1 && (
                                <div className="flex justify-center gap-2 pt-6">
                                    {routes.links?.prev && (
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={routes.links.prev}>Previous</Link>
                                        </Button>
                                    )}
                                    <span className="flex items-center px-3 text-sm text-deep-lighter">
                                        Page {routes.meta.current_page} of {routes.meta.last_page}
                                    </span>
                                    {routes.links?.next && (
                                        <Button variant="outline" size="sm" asChild>
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
