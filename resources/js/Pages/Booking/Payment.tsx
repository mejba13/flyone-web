import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Badge } from '@/Components/ui/badge';
import { Separator } from '@/Components/ui/separator';
import { formatCurrency } from '@/Lib/utils';
import { CreditCard, Lock, Shield } from 'lucide-react';
import type { Route } from '@/Types';

interface Props {
    route: Route;
    stripeKey: string;
}

export default function Payment({ route, stripeKey }: Props) {
    const form = useForm({
        booking_id: '',
        payment_method_id: '',
        travelers: [],
    });
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    const total = route.base_price * 1.1;

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/payments/process');
    };

    return (
        <MainLayout title="Payment">
            <div className="bg-soft min-h-screen py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-2xl font-display font-bold text-deep text-center mb-8">Secure Payment</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CreditCard className="h-5 w-5" /> Payment Method
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2 p-3 bg-success/10 text-success rounded-xl mb-6 text-sm">
                                        <Lock className="h-4 w-4" />
                                        Your payment is secured with 256-bit SSL encryption
                                    </div>

                                    <form onSubmit={handlePayment} className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium mb-1.5 block">Card Number</label>
                                            <Input
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(e.target.value)}
                                                placeholder="4242 4242 4242 4242"
                                                icon={<CreditCard className="h-4 w-4" />}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium mb-1.5 block">Expiry</label>
                                                <Input
                                                    value={expiry}
                                                    onChange={(e) => setExpiry(e.target.value)}
                                                    placeholder="MM/YY"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium mb-1.5 block">CVC</label>
                                                <Input
                                                    value={cvc}
                                                    onChange={(e) => setCvc(e.target.value)}
                                                    placeholder="123"
                                                />
                                            </div>
                                        </div>

                                        <Button type="submit" size="xl" className="w-full" loading={form.processing}>
                                            <Lock className="h-4 w-4" />
                                            Pay {formatCurrency(total)}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="sticky top-24 p-6 h-fit">
                            <h3 className="font-display font-semibold mb-4">Order Summary</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-deep-lighter">{route.origin_code} → {route.destination_code}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-deep-lighter">Base fare</span>
                                    <span>{formatCurrency(route.base_price)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-deep-lighter">Taxes & fees</span>
                                    <span>{formatCurrency(route.base_price * 0.1)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-display font-bold text-xl">
                                    <span>Total</span>
                                    <span className="text-primary-600">{formatCurrency(total)}</span>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-xs text-deep-lighter">
                                <Shield className="h-4 w-4" />
                                <span>Powered by Stripe</span>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
