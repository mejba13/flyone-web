import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Separator } from '@/Components/ui/separator';
import { motion } from 'framer-motion';
import { formatCurrency, formatDate, formatTime, formatDuration } from '@/Lib/utils';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle, Download, Share2, Calendar, Plane, ArrowRight } from 'lucide-react';
import type { Booking } from '@/Types';

interface Props {
    booking: Booking;
}

export default function Confirmation({ booking }: Props) {
    const firstSeg = booking.segments?.[0];

    return (
        <MainLayout title="Booking Confirmed">
            <div className="bg-soft min-h-screen py-12">
                <div className="max-w-2xl mx-auto px-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="text-center mb-8"
                    >
                        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="h-10 w-10 text-success" />
                        </div>
                        <h1 className="text-3xl font-display font-bold text-deep mb-2">Booking Confirmed!</h1>
                        <p className="text-deep-lighter">Your booking reference is</p>
                        <p className="text-2xl font-display font-bold text-primary-600 mt-1">{booking.booking_ref}</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Card className="overflow-hidden">
                            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white text-center">
                                <Plane className="h-8 w-8 mx-auto mb-2" />
                                <p className="font-display font-bold text-lg">E-Ticket</p>
                            </div>
                            <CardContent className="p-6 space-y-6">
                                {firstSeg && (
                                    <div className="flex items-center justify-between">
                                        <div className="text-center">
                                            <p className="text-2xl font-display font-bold">{firstSeg.origin_code}</p>
                                            <p className="text-sm text-deep-lighter">{formatTime(firstSeg.departure_at)}</p>
                                            <p className="text-xs text-deep-lighter">{formatDate(firstSeg.departure_at)}</p>
                                        </div>
                                        <div className="flex-1 flex items-center mx-4">
                                            <div className="h-px flex-1 bg-soft-dark" />
                                            <ArrowRight className="h-4 w-4 text-deep-lighter mx-1" />
                                            <div className="h-px flex-1 bg-soft-dark" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-display font-bold">{firstSeg.destination_code}</p>
                                            <p className="text-sm text-deep-lighter">{formatTime(firstSeg.arrival_at)}</p>
                                            <p className="text-xs text-deep-lighter">{formatDate(firstSeg.arrival_at)}</p>
                                        </div>
                                    </div>
                                )}

                                <Separator />

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-deep-lighter">Status</p>
                                        <Badge variant="success">{booking.status}</Badge>
                                    </div>
                                    <div>
                                        <p className="text-deep-lighter">Total Paid</p>
                                        <p className="font-display font-bold text-lg">{formatCurrency(booking.total_amount)}</p>
                                    </div>
                                    <div>
                                        <p className="text-deep-lighter">Passengers</p>
                                        <p className="font-medium">{booking.tickets?.length || 1}</p>
                                    </div>
                                    <div>
                                        <p className="text-deep-lighter">Carrier</p>
                                        <p className="font-medium">{firstSeg?.carrier_name}</p>
                                    </div>
                                </div>

                                <div className="flex justify-center py-4">
                                    <QRCodeSVG value={booking.booking_ref} size={150} level="M" />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <Button className="flex-1" asChild>
                            <Link href="/dashboard/trips">View My Trips</Link>
                        </Button>
                        <Button variant="secondary" className="flex-1">
                            <Calendar className="h-4 w-4" /> Add to Calendar
                        </Button>
                        <Button variant="outline" className="flex-1">
                            <Share2 className="h-4 w-4" /> Share
                        </Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
