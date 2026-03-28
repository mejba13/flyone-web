import { useState } from 'react';
import { router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useSearchStore } from '@/Stores/searchStore';
import { motion } from 'framer-motion';
import {
    Search as SearchIcon, MapPin, Calendar, Users, ArrowLeftRight,
    Plane, Train, Bus, Ship,
} from 'lucide-react';

const modeIcons: Record<string, typeof Plane> = { flight: Plane, train: Train, bus: Bus, ferry: Ship };

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
            <div className="bg-gradient-to-b from-deep to-deep-light py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-2">
                            Search for your next adventure
                        </h1>
                        <p className="text-primary-200 text-center mb-8">
                            Compare flights, trains, buses, and ferries in one search
                        </p>

                        <Card className="shadow-xl">
                            <CardContent className="p-6">
                                {/* Mode Selection */}
                                <div className="flex gap-2 mb-6 flex-wrap">
                                    {Object.entries(modeIcons).map(([mode, Icon]) => (
                                        <button
                                            key={mode}
                                            onClick={() => setFilters({ mode })}
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                                filters.mode === mode
                                                    ? 'bg-primary-100 text-primary-600 shadow-sm'
                                                    : 'text-deep-lighter hover:bg-soft'
                                            }`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span className="capitalize">{mode}s</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Trip Type Tabs */}
                                <Tabs value={tripType} onValueChange={(v) => { setTripType(v); setFilters({ trip_type: v as any }); }} className="mb-6">
                                    <TabsList>
                                        <TabsTrigger value="one_way">One Way</TabsTrigger>
                                        <TabsTrigger value="round_trip">Round Trip</TabsTrigger>
                                        <TabsTrigger value="multi_city">Multi-City</TabsTrigger>
                                    </TabsList>
                                </Tabs>

                                {/* Search Fields */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-center">
                                        <Input
                                            placeholder="From — City or airport"
                                            icon={<MapPin className="h-4 w-4" />}
                                            value={filters.origin}
                                            onChange={(e) => setFilters({ origin: e.target.value })}
                                            className="h-12"
                                        />
                                        <button
                                            onClick={swapLocations}
                                            className="w-10 h-10 rounded-full border border-soft-dark flex items-center justify-center hover:bg-soft transition-colors mx-auto"
                                        >
                                            <ArrowLeftRight className="h-4 w-4 text-deep-lighter" />
                                        </button>
                                        <Input
                                            placeholder="To — City or airport"
                                            icon={<MapPin className="h-4 w-4" />}
                                            value={filters.destination}
                                            onChange={(e) => setFilters({ destination: e.target.value })}
                                            className="h-12"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <Input
                                            type="date"
                                            icon={<Calendar className="h-4 w-4" />}
                                            value={filters.departure_date}
                                            onChange={(e) => setFilters({ departure_date: e.target.value })}
                                            className="h-12"
                                        />
                                        {tripType === 'round_trip' && (
                                            <Input
                                                type="date"
                                                icon={<Calendar className="h-4 w-4" />}
                                                value={filters.return_date || ''}
                                                onChange={(e) => setFilters({ return_date: e.target.value })}
                                                className="h-12"
                                                placeholder="Return date"
                                            />
                                        )}
                                        <div className="grid grid-cols-2 gap-3">
                                            <Select value={String(filters.passengers)} onValueChange={(v) => setFilters({ passengers: Number(v) })}>
                                                <SelectTrigger className="h-12">
                                                    <Users className="h-4 w-4 mr-2 text-deep-lighter" />
                                                    <SelectValue placeholder="Passengers" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {[1,2,3,4,5,6,7,8,9].map((n) => (
                                                        <SelectItem key={n} value={String(n)}>{n} {n === 1 ? 'Passenger' : 'Passengers'}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Select value={filters.class} onValueChange={(v) => setFilters({ class: v })}>
                                                <SelectTrigger className="h-12">
                                                    <SelectValue placeholder="Class" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="economy">Economy</SelectItem>
                                                    <SelectItem value="premium_economy">Premium</SelectItem>
                                                    <SelectItem value="business">Business</SelectItem>
                                                    <SelectItem value="first">First</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <Button onClick={handleSearch} size="xl" className="w-full mt-6">
                                    <SearchIcon className="h-5 w-5" />
                                    Search {filters.mode ? filters.mode + 's' : 'routes'}
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}
