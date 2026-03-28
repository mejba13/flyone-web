import { Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { motion } from 'framer-motion';
import { formatCurrency, formatDate, formatTime, daysUntil, getStatusColor, formatDuration } from '@/Lib/utils';
import { Plane, ArrowRight, Calendar, Clock, MoreVertical } from 'lucide-react';
import type { Booking, PaginatedData } from '@/Types';

interface Props {
    upcoming: Booking[];
    past: PaginatedData<Booking>;
}

function TripCard({ trip, showCountdown = false }: { trip: Booking; showCountdown?: boolean }) {
    const first = trip.segments?.[0];
    const last = trip.segments?.[trip.segments.length - 1];
    const days = first ? daysUntil(first.departure_at) : 0;

    return (
        <Card className="p-5 hover:shadow-card-hover transition-all">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                        <Plane className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                        <p className="font-medium text-sm">{first?.carrier_name || 'Unknown Carrier'}</p>
                        <p className="text-xs text-deep-lighter">Ref: {trip.booking_ref}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(trip.status)}>{trip.status}</Badge>
                    {showCountdown && days > 0 && (
                        <Badge variant="teal">{days}d away</Badge>
                    )}
                </div>
            </div>

            {trip.segments?.map((seg) => (
                <div key={seg.id} className="flex items-center gap-4 mb-3">
                    <div>
                        <p className="font-display font-bold text-lg">{formatTime(seg.departure_at)}</p>
                        <p className="text-xs text-deep-lighter">{seg.origin_code}</p>
                    </div>
                    <div className="flex-1 text-center">
                        <div className="h-px bg-soft-dark w-full" />
                    </div>
                    <div className="text-right">
                        <p className="font-display font-bold text-lg">{formatTime(seg.arrival_at)}</p>
                        <p className="text-xs text-deep-lighter">{seg.destination_code}</p>
                    </div>
                </div>
            ))}

            <div className="flex items-center justify-between pt-3 border-t border-soft-dark/50">
                <div className="flex items-center gap-3 text-xs text-deep-lighter">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{first && formatDate(first.departure_at)}</span>
                    <span>{trip.tickets?.length || 0} passenger(s)</span>
                </div>
                <p className="font-display font-bold text-primary-600">{formatCurrency(trip.total_amount, trip.currency)}</p>
            </div>
        </Card>
    );
}

export default function Trips({ upcoming, past }: Props) {
    return (
        <DashboardLayout title="My Trips">
            <div className="space-y-6">
                <h1 className="text-2xl font-display font-bold text-deep">My Trips</h1>

                <Tabs defaultValue="upcoming">
                    <TabsList>
                        <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
                        <TabsTrigger value="past">Past ({past.meta?.total || past.data?.length || 0})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming">
                        {upcoming.length > 0 ? (
                            <div className="space-y-4">
                                {upcoming.map((trip, i) => (
                                    <motion.div key={trip.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                        <TripCard trip={trip} showCountdown />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <Card className="p-12 text-center">
                                <Plane className="h-12 w-12 text-deep-lighter/30 mx-auto mb-3" />
                                <p className="text-deep-lighter mb-4">No upcoming trips</p>
                                <Button asChild><Link href="/search">Book a trip</Link></Button>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="past">
                        {past.data && past.data.length > 0 ? (
                            <div className="space-y-4">
                                {past.data.map((trip, i) => (
                                    <motion.div key={trip.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                        <TripCard trip={trip} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <Card className="p-12 text-center">
                                <p className="text-deep-lighter">No past trips yet</p>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
