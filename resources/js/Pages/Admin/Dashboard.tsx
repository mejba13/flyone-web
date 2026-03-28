import MainLayout from '@/Layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { motion } from 'framer-motion';
import { formatCurrency, formatDate, getStatusColor } from '@/Lib/utils';
import { Users, Ticket, DollarSign, Building2, ArrowRight } from 'lucide-react';
import type { Booking } from '@/Types';

interface Props {
    stats: {
        total_users: number;
        total_bookings: number;
        total_revenue: number;
        active_providers: number;
        recent_bookings: Booking[];
    };
}

export default function AdminDashboard({ stats }: Props) {
    const cards = [
        { icon: Users, label: 'Total Users', value: stats.total_users, color: 'bg-primary-50 text-primary-600' },
        { icon: Ticket, label: 'Total Bookings', value: stats.total_bookings, color: 'bg-teal/10 text-teal-dark' },
        { icon: DollarSign, label: 'Revenue', value: formatCurrency(stats.total_revenue), color: 'bg-success/10 text-success' },
        { icon: Building2, label: 'Active Providers', value: stats.active_providers, color: 'bg-warning/10 text-warning' },
    ];

    return (
        <MainLayout title="Admin Dashboard">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-display font-bold text-deep mb-8">Admin Dashboard</h1>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {cards.map((card, i) => (
                        <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <Card className="p-5">
                                <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-3`}>
                                    <card.icon className="h-5 w-5" />
                                </div>
                                <p className="text-2xl font-display font-bold">{card.value}</p>
                                <p className="text-sm text-deep-lighter">{card.label}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <Card>
                    <CardHeader><CardTitle>Recent Bookings</CardTitle></CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-soft-dark">
                                        <th className="text-left py-3 px-4 font-medium text-deep-lighter">Ref</th>
                                        <th className="text-left py-3 px-4 font-medium text-deep-lighter">Route</th>
                                        <th className="text-left py-3 px-4 font-medium text-deep-lighter">Status</th>
                                        <th className="text-right py-3 px-4 font-medium text-deep-lighter">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recent_bookings?.map((b) => (
                                        <tr key={b.id} className="border-b border-soft-dark/50 hover:bg-soft">
                                            <td className="py-3 px-4 font-mono font-medium">{b.booking_ref}</td>
                                            <td className="py-3 px-4">
                                                {b.segments?.[0] && (
                                                    <span>{b.segments[0].origin_code} <ArrowRight className="h-3 w-3 inline" /> {b.segments[0].destination_code}</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4"><Badge className={getStatusColor(b.status)}>{b.status}</Badge></td>
                                            <td className="py-3 px-4 text-right font-medium">{formatCurrency(b.total_amount)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
