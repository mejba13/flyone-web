import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { formatCurrency } from '@/Lib/utils';
import { MapPin, Thermometer, Lightbulb, Compass, Search } from 'lucide-react';
import type { Destination } from '@/Types';

interface Props {
    destination: Destination;
}

export default function DestinationShow({ destination }: Props) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Place',
        name: destination.name,
        description: destination.description,
        address: { '@type': 'PostalAddress', addressCountry: destination.country_code },
        geo: destination.latitude ? {
            '@type': 'GeoCoordinates',
            latitude: destination.latitude,
            longitude: destination.longitude,
        } : undefined,
    };

    return (
        <MainLayout title={destination.name}>
            <Head>
                <meta name="description" content={destination.description || `Travel to ${destination.name}, ${destination.country}`} />
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Head>

            {/* Hero */}
            <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary-500 to-teal">
                {destination.image_url && (
                    <img src={destination.image_url} alt={destination.name} className="w-full h-full object-cover opacity-60" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-deep/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    <Badge variant="teal" className="mb-3">{destination.country}</Badge>
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">{destination.name}</h1>
                    {destination.avg_price && (
                        <p className="text-primary-200">Flights from {formatCurrency(destination.avg_price)}</p>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {destination.description && (
                            <Card>
                                <CardHeader><CardTitle>About {destination.name}</CardTitle></CardHeader>
                                <CardContent>
                                    <p className="text-deep-lighter leading-relaxed">{destination.description}</p>
                                </CardContent>
                            </Card>
                        )}

                        {destination.highlights && destination.highlights.length > 0 && (
                            <Card>
                                <CardHeader><CardTitle className="flex items-center gap-2"><Compass className="h-5 w-5 text-primary-500" /> Highlights</CardTitle></CardHeader>
                                <CardContent>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {destination.highlights.map((h, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-deep-lighter">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 shrink-0" />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {destination.travel_tips && destination.travel_tips.length > 0 && (
                            <Card>
                                <CardHeader><CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-warning" /> Travel Tips</CardTitle></CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {destination.travel_tips.map((tip, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-deep-lighter">
                                                <span className="text-warning font-medium shrink-0">{i + 1}.</span>
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <div className="space-y-6">
                        <Card className="p-6">
                            <Button size="lg" className="w-full mb-4" asChild>
                                <Link href={`/search?destination=${destination.code}`}>
                                    <Search className="h-4 w-4" /> Search Routes
                                </Link>
                            </Button>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-deep-lighter">Airport Code</span>
                                    <span className="font-medium">{destination.code}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-deep-lighter">Country</span>
                                    <span className="font-medium">{destination.country}</span>
                                </div>
                                {destination.timezone && (
                                    <div className="flex justify-between">
                                        <span className="text-deep-lighter">Timezone</span>
                                        <span className="font-medium">{destination.timezone}</span>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {destination.weather && (
                            <Card className="p-6">
                                <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                                    <Thermometer className="h-5 w-5 text-teal" /> Weather
                                </h3>
                                <div className="space-y-2 text-sm">
                                    {Object.entries(destination.weather).map(([key, value]) => (
                                        <div key={key} className="flex justify-between">
                                            <span className="text-deep-lighter capitalize">{key}</span>
                                            <span className="font-medium">{String(value)}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
