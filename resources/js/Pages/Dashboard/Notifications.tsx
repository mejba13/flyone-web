import { router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { formatDate } from '@/Lib/utils';
import { cn } from '@/Lib/utils';
import { Bell, CheckCheck, Plane, CreditCard, Gift, Megaphone, Settings } from 'lucide-react';
import type { Notification, PaginatedData } from '@/Types';

interface Props {
    notifications: PaginatedData<Notification>;
}

const categoryIcons: Record<string, typeof Bell> = {
    booking: Plane,
    payment: CreditCard,
    promotion: Megaphone,
    loyalty: Gift,
    system: Settings,
    travel: Plane,
};

export default function Notifications({ notifications }: Props) {
    const markAllRead = () => router.post('/dashboard/notifications/mark-all-read');

    return (
        <DashboardLayout title="Notifications">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-display font-bold text-deep">Notifications</h1>
                    <Button variant="ghost" size="sm" onClick={markAllRead}>
                        <CheckCheck className="h-4 w-4" /> Mark all read
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-0">
                        {notifications.data && notifications.data.length > 0 ? (
                            <div className="divide-y divide-soft-dark/50">
                                {notifications.data.map((notif) => {
                                    const Icon = categoryIcons[notif.category] || Bell;
                                    return (
                                        <div
                                            key={notif.id}
                                            className={cn(
                                                'flex items-start gap-4 p-4 transition-colors hover:bg-soft cursor-pointer',
                                                !notif.read_at && 'bg-primary-50/30'
                                            )}
                                            onClick={() => router.post(`/dashboard/notifications/${notif.id}/read`)}
                                        >
                                            <div className={cn(
                                                'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                                                !notif.read_at ? 'bg-primary-100 text-primary-600' : 'bg-soft-dark text-deep-lighter'
                                            )}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium text-sm">{notif.title}</p>
                                                    {!notif.read_at && <div className="w-2 h-2 rounded-full bg-primary-500" />}
                                                </div>
                                                {notif.body && <p className="text-sm text-deep-lighter mt-0.5 line-clamp-2">{notif.body}</p>}
                                                <p className="text-xs text-deep-lighter mt-1">{formatDate(notif.created_at)}</p>
                                            </div>
                                            <Badge variant="outline" className="text-[10px] shrink-0 capitalize">{notif.category}</Badge>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Bell className="h-12 w-12 text-deep-lighter/30 mx-auto mb-3" />
                                <p className="text-deep-lighter">No notifications yet</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
