import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Badge } from '@/Components/ui/badge';
import { Separator } from '@/Components/ui/separator';
import { formatCurrency, formatDate, formatTime, formatDuration } from '@/Lib/utils';
import { Plane, ArrowRight, Tag, Check } from 'lucide-react';
import type { Route } from '@/Types';

interface Props {
    route: Route;
    bookingData: Record<string, any>;
}

export default function Review({ route, bookingData }: Props) {
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    const [discount, setDiscount] = useState(0);

    const subtotal = route.base_price;
    const tax = subtotal * 0.1;
    const total = subtotal + tax - discount;

    return (
        <MainLayout title="Review Booking">
            <div className="bg-soft min-h-screen py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-2xl font-display font-bold text-deep text-center mb-8">Review Your Booking</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Itinerary */}
                            <Card>
                                <CardHeader><CardTitle>Itinerary</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <p className="text-2xl font-display font-bold">{formatTime(route.departure_at)}</p>
                                            <p className="font-display font-semibold text-lg">{route.origin_code}</p>
                                            <p className="text-xs text-deep-lighter">{route.origin_name}</p>
                                        </div>
                                        <div className="flex-1 text-center">
                                            <p className="text-xs text-deep-lighter mb-1">{formatDuration(route.duration_minutes)}</p>
                                            <div className="flex items-center gap-1">
                                                <div className="h-px flex-1 bg-soft-dark" />
                                                <Plane className="h-4 w-4 text-primary-500" />
                                                <div className="h-px flex-1 bg-soft-dark" />
                                            </div>
                                            <p className="text-xs text-deep-lighter mt-1">{route.stops === 0 ? 'Direct' : `${route.stops} stop(s)`}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-display font-bold">{formatTime(route.arrival_at)}</p>
                                            <p className="font-display font-semibold text-lg">{route.destination_code}</p>
                                            <p className="text-xs text-deep-lighter">{route.destination_name}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-soft-dark/50 flex items-center gap-4 text-sm text-deep-lighter">
                                        <span>{formatDate(route.departure_at)}</span>
                                        <span>{route.provider?.name}</span>
                                        <span>{route.route_number}</span>
                                        <Badge variant="default" className="capitalize">{route.class.replace('_', ' ')}</Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Promo Code */}
                            <Card className="p-5">
                                <div className="flex items-center gap-3">
                                    <Tag className="h-5 w-5 text-primary-500" />
                                    <h3 className="font-display font-semibold">Have a promo code?</h3>
                                </div>
                                <div className="flex gap-3 mt-4">
                                    <Input
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                        placeholder="Enter code"
                                        className="flex-1"
                                        disabled={promoApplied}
                                    />
                                    <Button
                                        variant={promoApplied ? 'ghost' : 'secondary'}
                                        onClick={() => { setPromoApplied(true); setDiscount(15); }}
                                        disabled={!promoCode || promoApplied}
                                    >
                                        {promoApplied ? <><Check className="h-4 w-4" /> Applied</> : 'Apply'}
                                    </Button>
                                </div>
                            </Card>
                        </div>

                        {/* Price Breakdown */}
                        <Card className="sticky top-24 p-6 h-fit">
                            <h3 className="font-display font-semibold mb-4">Price Breakdown</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-deep-lighter">Base fare</span>
                                    <span>{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-deep-lighter">Taxes & fees</span>
                                    <span>{formatCurrency(tax)}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-success">
                                        <span>Promo discount</span>
                                        <span>-{formatCurrency(discount)}</span>
                                    </div>
                                )}
                                <Separator />
                                <div className="flex justify-between font-display font-bold text-xl pt-2">
                                    <span>Total</span>
                                    <span className="text-primary-600">{formatCurrency(total)}</span>
                                </div>
                            </div>
                            <Button className="w-full mt-6" size="lg" asChild>
                                <Link href={`/booking/payment?route_id=${route.id}`}>
                                    Proceed to Payment
                                </Link>
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
