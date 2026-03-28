import { useState } from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { cn } from '@/Lib/utils';
import type { Route } from '@/Types';

interface Props {
    route: Route;
    totalSeats: number;
    availableSeats: number;
}

type SeatStatus = 'available' | 'selected' | 'occupied' | 'premium';

export default function SeatSelection({ route, totalSeats, availableSeats }: Props) {
    const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

    const rows = 20;
    const cols = ['A', 'B', 'C', '', 'D', 'E', 'F'];

    const getRandomStatus = (row: number, col: string): SeatStatus => {
        if (col === '') return 'available';
        const hash = (row * 7 + col.charCodeAt(0)) % 10;
        if (hash < 3) return 'occupied';
        if (row <= 3) return 'premium';
        return 'available';
    };

    const seatColors: Record<SeatStatus, string> = {
        available: 'bg-soft-dark hover:bg-primary-200 cursor-pointer',
        selected: 'bg-primary-500 text-white',
        occupied: 'bg-deep-lighter/30 cursor-not-allowed',
        premium: 'bg-teal/20 hover:bg-teal/40 cursor-pointer border border-teal/30',
    };

    return (
        <MainLayout title="Select Your Seat">
            <div className="bg-soft min-h-screen py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-2xl font-display font-bold text-deep text-center mb-8">Select Your Seat</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <Card className="p-6">
                                {/* Legend */}
                                <div className="flex flex-wrap gap-4 mb-6 justify-center">
                                    {[
                                        { status: 'available' as const, label: 'Available' },
                                        { status: 'selected' as const, label: 'Selected' },
                                        { status: 'occupied' as const, label: 'Occupied' },
                                        { status: 'premium' as const, label: 'Premium' },
                                    ].map(({ status, label }) => (
                                        <div key={status} className="flex items-center gap-2">
                                            <div className={cn('w-6 h-6 rounded-lg', seatColors[status])} />
                                            <span className="text-xs text-deep-lighter">{label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Seat Map */}
                                <div className="flex flex-col items-center gap-1">
                                    {/* Column Headers */}
                                    <div className="flex gap-1 mb-2">
                                        {cols.map((col, i) => (
                                            <div key={i} className="w-9 h-6 flex items-center justify-center text-xs font-medium text-deep-lighter">
                                                {col}
                                            </div>
                                        ))}
                                    </div>

                                    {Array.from({ length: rows }, (_, row) => (
                                        <div key={row} className="flex gap-1 items-center">
                                            {cols.map((col, i) => {
                                                if (col === '') {
                                                    return <div key={i} className="w-9 h-9 flex items-center justify-center text-xs text-deep-lighter">{row + 1}</div>;
                                                }
                                                const seatId = `${row + 1}${col}`;
                                                const status = selectedSeat === seatId ? 'selected' : getRandomStatus(row + 1, col);
                                                const isClickable = status === 'available' || status === 'premium' || status === 'selected';

                                                return (
                                                    <button
                                                        key={i}
                                                        className={cn(
                                                            'w-9 h-9 rounded-lg text-xs font-medium transition-all',
                                                            seatColors[status]
                                                        )}
                                                        disabled={!isClickable}
                                                        onClick={() => isClickable && setSelectedSeat(seatId === selectedSeat ? null : seatId)}
                                                    >
                                                        {status !== 'occupied' && seatId}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        <div>
                            <Card className="sticky top-24 p-6">
                                <h3 className="font-display font-semibold mb-4">Selected Seat</h3>
                                {selectedSeat ? (
                                    <div className="text-center p-6 bg-primary-50 rounded-xl mb-4">
                                        <p className="text-3xl font-display font-bold text-primary-600">{selectedSeat}</p>
                                        <Badge variant="default" className="mt-2">
                                            {parseInt(selectedSeat) <= 3 ? 'Premium' : 'Standard'}
                                        </Badge>
                                    </div>
                                ) : (
                                    <p className="text-sm text-deep-lighter text-center py-6">Click a seat to select</p>
                                )}
                                <Button className="w-full" size="lg" disabled={!selectedSeat} asChild>
                                    <Link href={`/booking/addons?route_id=${route.id}`}>Continue to Add-ons</Link>
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
