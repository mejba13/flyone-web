import { Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '@/Hooks/useAuth';
import { formatCurrency, formatDate, formatTime, daysUntil, getStatusColor } from '@/Lib/utils';
import { Plane, Gift, Ticket, Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import type { Booking } from '@/Types';

interface Props {
    upcomingTrips: Booking[];
    stats: { total_bookings: number; points_balance: number; tier: string; upcoming_count: number };
}

export default function DashboardIndex({ upcomingTrips, stats }: Props) {
    const { user } = useAuth();

    const statCards = [
        { icon: Ticket, label: 'Total Bookings', value: stats.total_bookings, color: 'bg-primary-50 text-primary-600' },
        { icon: Gift, label: 'Points Balance', value: stats.points_balance.toLocaleString(), color: 'bg-teal/10 text-teal-dark' },
        { icon: TrendingUp, label: 'Tier Status', value: stats.tier, color: 'bg-warning/10 text-warning' },
        { icon: Calendar, label: 'Upcoming Trips', value: stats.upcoming_count, color: 'bg-info/10 text-info' },
    ];

    return (
        <DashboardLayout title="Dashboard">
            <div className="space-y-8">
                {/* Welcome */}
                <div>
                    <h1 className="text-2xl font-display font-bold text-deep">
                        Welcome back, {user?.name?.split(' ')[0]}!
                    </h1>
                    <p className="text-deep-lighter mt-1">Here's a summary of your travel activity</p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCards.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="p-5">
                                <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                                <p className="text-2xl font-display font-bold text-deep capitalize">{stat.value}</p>
                                <p className="text-sm text-deep-lighter">{stat.label}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Upcoming Trips */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Upcoming Trips</CardTitle>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/dashboard/trips">View all</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {upcomingTrips.length > 0 ? (
                            <div className="space-y-4">
                                {upcomingTrips.map((trip) => {
                                    const firstSegment = trip.segments?.[0];
                                    const lastSegment = trip.segments?.[trip.segments.length - 1];
                                    const days = firstSegment ? daysUntil(firstSegment.departure_at) : 0;

                                    return (
                                        <Link key={trip.id} href={`/dashboard/trips`} className="block">
                                            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-soft transition-colors">
                                                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                                                    <Plane className="h-6 w-6 text-primary-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-display font-semibold">{firstSegment?.origin_code}</span>
                                                        <ArrowRight className="h-3 w-3 text-deep-lighter" />
                                                        <span className="font-display font-semibold">{lastSegment?.destination_code}</span>
                                                        <Badge className={getStatusColor(trip.status)} variant="outline">{trip.status}</Badge>
                                                    </div>
                                                    <p className="text-sm text-deep-lighter">
                                                        {firstSegment && formatDate(firstSegment.departure_at)} · Ref: {trip.booking_ref}
                                                    </p>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    {days > 0 && (
                                                        <p className="text-sm font-medium text-primary-600">{days} days</p>
                                                    )}
                                                    <p className="text-sm font-display font-semibold">
                                                        {formatCurrency(trip.total_amount, trip.currency)}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Plane className="h-12 w-12 text-deep-lighter/30 mx-auto mb-3" />
                                <p className="text-deep-lighter mb-4">No upcoming trips</p>
                                <Button asChild>
                                    <Link href="/search">Book a trip</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
