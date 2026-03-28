import MainLayout from '@/Layouts/MainLayout';
import { Card } from '@/Components/ui/card';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/Lib/utils';
import { Route as RouteIcon, CheckCircle, DollarSign, BarChart } from 'lucide-react';

interface Props {
    stats: { total_routes: number; active_routes: number; total_bookings: number; revenue: number };
}

export default function ProviderDashboard({ stats }: Props) {
    const cards = [
        { icon: RouteIcon, label: 'Total Routes', value: stats.total_routes, color: 'bg-primary-50 text-primary-600' },
        { icon: CheckCircle, label: 'Active Routes', value: stats.active_routes, color: 'bg-success/10 text-success' },
        { icon: BarChart, label: 'Bookings', value: stats.total_bookings, color: 'bg-teal/10 text-teal-dark' },
        { icon: DollarSign, label: 'Revenue', value: formatCurrency(stats.revenue), color: 'bg-warning/10 text-warning' },
    ];

    return (
        <MainLayout title="Provider Dashboard">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-display font-bold text-deep mb-8">Provider Portal</h1>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
            </div>
        </MainLayout>
    );
}
