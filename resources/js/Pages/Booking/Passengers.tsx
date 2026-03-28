import { useForm, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Badge } from '@/Components/ui/badge';
import { formatCurrency, formatTime, formatDuration } from '@/Lib/utils';
import { User, Plus, ArrowRight, Check } from 'lucide-react';
import type { Route, Traveler } from '@/Types';
import { useState } from 'react';

interface Props {
    route: Route;
    savedTravelers: Traveler[];
}

export default function Passengers({ route, savedTravelers }: Props) {
    const [selectedTravelers, setSelectedTravelers] = useState<number[]>([]);
    const [showNewForm, setShowNewForm] = useState(savedTravelers.length === 0);

    const form = useForm({
        full_name: '',
        date_of_birth: '',
        nationality: '',
        passport_number: '',
        passport_expiry: '',
        gender: '',
    });

    const toggleTraveler = (id: number) => {
        setSelectedTravelers((prev) =>
            prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
        );
    };

    return (
        <MainLayout title="Passenger Details">
            <div className="bg-soft min-h-screen py-8">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        {['Passengers', 'Seats', 'Add-ons', 'Review', 'Payment', 'Confirmation'].map((step, i) => (
                            <div key={step} className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                                    i === 0 ? 'bg-primary-500 text-white' : 'bg-soft-dark text-deep-lighter'
                                }`}>
                                    {i + 1}
                                </div>
                                <span className={`text-xs hidden sm:block ${i === 0 ? 'text-deep font-medium' : 'text-deep-lighter'}`}>{step}</span>
                                {i < 5 && <div className="w-4 h-px bg-soft-dark hidden sm:block" />}
                            </div>
                        ))}
                    </div>

                    {/* Route Summary */}
                    <Card className="p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div>
                                    <p className="font-display font-bold text-lg">{formatTime(route.departure_at)}</p>
                                    <p className="text-xs text-deep-lighter">{route.origin_code}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-px w-12 bg-soft-dark" />
                                    <ArrowRight className="h-4 w-4 text-deep-lighter" />
                                    <div className="h-px w-12 bg-soft-dark" />
                                </div>
                                <div>
                                    <p className="font-display font-bold text-lg">{formatTime(route.arrival_at)}</p>
                                    <p className="text-xs text-deep-lighter">{route.destination_code}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-display font-bold text-primary-600">{formatCurrency(route.base_price)}</p>
                                <p className="text-xs text-deep-lighter">{formatDuration(route.duration_minutes)}</p>
                            </div>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Saved Travelers */}
                            {savedTravelers.length > 0 && (
                                <Card>
                                    <CardHeader><CardTitle>Saved Travelers</CardTitle></CardHeader>
                                    <CardContent className="space-y-3">
                                        {savedTravelers.map((t) => (
                                            <button
                                                key={t.id}
                                                onClick={() => toggleTraveler(t.id)}
                                                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                                                    selectedTravelers.includes(t.id)
                                                        ? 'border-primary-400 bg-primary-50'
                                                        : 'border-soft-dark hover:border-primary-200'
                                                }`}
                                            >
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                    selectedTravelers.includes(t.id)
                                                        ? 'bg-primary-500 text-white'
                                                        : 'bg-soft-dark text-deep-lighter'
                                                }`}>
                                                    {selectedTravelers.includes(t.id) ? <Check className="h-4 w-4" /> : <User className="h-4 w-4" />}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{t.full_name}</p>
                                                    <p className="text-xs text-deep-lighter">{t.nationality} · {t.passport_number || 'No passport'}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </CardContent>
                                </Card>
                            )}

                            {/* New Traveler Form */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{savedTravelers.length > 0 ? 'Add New Passenger' : 'Passenger Details'}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                                                <Input value={form.data.full_name} onChange={(e) => form.setData('full_name', e.target.value)} placeholder="As on passport" />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium mb-1.5 block">Date of Birth</label>
                                                <Input type="date" value={form.data.date_of_birth} onChange={(e) => form.setData('date_of_birth', e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium mb-1.5 block">Nationality</label>
                                                <Input value={form.data.nationality} onChange={(e) => form.setData('nationality', e.target.value)} placeholder="e.g. IDN" maxLength={3} />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium mb-1.5 block">Passport Number</label>
                                                <Input value={form.data.passport_number} onChange={(e) => form.setData('passport_number', e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium mb-1.5 block">Passport Expiry</label>
                                                <Input type="date" value={form.data.passport_expiry} onChange={(e) => form.setData('passport_expiry', e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium mb-1.5 block">Gender</label>
                                                <Select value={form.data.gender} onValueChange={(v) => form.setData('gender', v)}>
                                                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="male">Male</SelectItem>
                                                        <SelectItem value="female">Female</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Price Summary Sidebar */}
                        <div>
                            <Card className="sticky top-24 p-6">
                                <h3 className="font-display font-semibold mb-4">Price Summary</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-deep-lighter">Base fare</span>
                                        <span>{formatCurrency(route.base_price)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-deep-lighter">Passengers</span>
                                        <span>{Math.max(selectedTravelers.length, 1)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-deep-lighter">Taxes & fees</span>
                                        <span>{formatCurrency(route.base_price * 0.1)}</span>
                                    </div>
                                    <div className="border-t border-soft-dark pt-3 flex justify-between font-display font-bold text-lg">
                                        <span>Total</span>
                                        <span className="text-primary-600">
                                            {formatCurrency((route.base_price * Math.max(selectedTravelers.length, 1)) * 1.1)}
                                        </span>
                                    </div>
                                </div>
                                <Button className="w-full mt-6" size="lg" asChild>
                                    <Link href={`/booking/seats?route_id=${route.id}`}>Continue to Seats</Link>
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
