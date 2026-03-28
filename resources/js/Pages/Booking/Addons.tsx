import { useState } from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { formatCurrency } from '@/Lib/utils';
import { Luggage, UtensilsCrossed, Shield, Armchair, Check, Plus } from 'lucide-react';
import type { Route } from '@/Types';

interface Props {
    route: Route;
}

const addons = [
    { id: 'baggage_20', category: 'baggage', icon: Luggage, name: 'Extra Baggage 20kg', price: 25, desc: 'Add 20kg checked baggage' },
    { id: 'baggage_30', category: 'baggage', icon: Luggage, name: 'Extra Baggage 30kg', price: 40, desc: 'Add 30kg checked baggage' },
    { id: 'meal_standard', category: 'meal', icon: UtensilsCrossed, name: 'Standard Meal', price: 12, desc: 'Hot meal with drink' },
    { id: 'meal_premium', category: 'meal', icon: UtensilsCrossed, name: 'Premium Meal', price: 25, desc: 'Gourmet meal with wine' },
    { id: 'insurance', category: 'insurance', icon: Shield, name: 'Travel Insurance', price: 15, desc: 'Full trip protection' },
    { id: 'lounge', category: 'lounge', icon: Armchair, name: 'Lounge Access', price: 35, desc: 'Airport lounge access' },
];

export default function Addons({ route }: Props) {
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const toggle = (id: string) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const totalAddons = addons.filter((a) => selected.has(a.id)).reduce((sum, a) => sum + a.price, 0);

    return (
        <MainLayout title="Add-ons">
            <div className="bg-soft min-h-screen py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-2xl font-display font-bold text-deep text-center mb-2">Enhance Your Trip</h1>
                    <p className="text-deep-lighter text-center mb-8">Add extras to make your journey more comfortable</p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            {addons.map((addon) => (
                                <Card
                                    key={addon.id}
                                    className={`p-5 cursor-pointer transition-all ${
                                        selected.has(addon.id) ? 'ring-2 ring-primary-400 bg-primary-50/30' : 'hover:shadow-card-hover'
                                    }`}
                                    onClick={() => toggle(addon.id)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                            selected.has(addon.id) ? 'bg-primary-500 text-white' : 'bg-soft-dark text-deep-lighter'
                                        }`}>
                                            {selected.has(addon.id) ? <Check className="h-5 w-5" /> : <addon.icon className="h-5 w-5" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium">{addon.name}</p>
                                            <p className="text-sm text-deep-lighter">{addon.desc}</p>
                                        </div>
                                        <p className="font-display font-bold text-primary-600">{formatCurrency(addon.price)}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <Card className="sticky top-24 p-6 h-fit">
                            <h3 className="font-display font-semibold mb-4">Add-ons Summary</h3>
                            {selected.size > 0 ? (
                                <div className="space-y-2 mb-4">
                                    {addons.filter((a) => selected.has(a.id)).map((a) => (
                                        <div key={a.id} className="flex justify-between text-sm">
                                            <span>{a.name}</span>
                                            <span>{formatCurrency(a.price)}</span>
                                        </div>
                                    ))}
                                    <div className="border-t border-soft-dark pt-2 flex justify-between font-display font-bold">
                                        <span>Total Add-ons</span>
                                        <span className="text-primary-600">{formatCurrency(totalAddons)}</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-deep-lighter mb-4">No add-ons selected</p>
                            )}
                            <Button className="w-full" size="lg" asChild>
                                <Link href={`/booking/review?route_id=${route.id}`}>Continue to Review</Link>
                            </Button>
                            <Button variant="ghost" className="w-full mt-2" asChild>
                                <Link href={`/booking/review?route_id=${route.id}`}>Skip add-ons</Link>
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
