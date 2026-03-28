import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/Lib/utils';
import { MapPin, Search } from 'lucide-react';
import type { Destination, PaginatedData } from '@/Types';
import { useState } from 'react';

interface Props {
    destinations: PaginatedData<Destination>;
}

export default function Destinations({ destinations }: Props) {
    const [search, setSearch] = useState('');

    const filtered = destinations.data.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.country.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <MainLayout title="Destinations">
            <div className="bg-gradient-to-b from-deep to-deep-light py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                        Explore Destinations
                    </h1>
                    <p className="text-primary-200 mb-8">Discover amazing places across Southeast Asia and beyond</p>
                    <div className="max-w-md mx-auto">
                        <Input
                            placeholder="Search destinations..."
                            icon={<Search className="h-4 w-4" />}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-12 bg-white"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map((dest, i) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link href={`/destinations/${dest.slug}`}>
                                <Card className="overflow-hidden group cursor-pointer h-full">
                                    <div className="relative h-48 bg-gradient-to-br from-primary-200 to-teal/30">
                                        {dest.image_url ? (
                                            <img src={dest.image_url} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <MapPin className="h-12 w-12 text-primary-400" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3 flex gap-1.5">
                                            {dest.is_popular && <Badge variant="amber">Popular</Badge>}
                                            {dest.is_featured && <Badge variant="premium">Featured</Badge>}
                                        </div>
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
                </div>
            </div>
        </MainLayout>
    );
}
