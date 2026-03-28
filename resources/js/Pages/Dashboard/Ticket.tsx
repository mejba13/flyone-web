import DashboardLayout from '@/Layouts/DashboardLayout';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Separator } from '@/Components/ui/separator';
import { formatDate, formatTime, getStatusColor } from '@/Lib/utils';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2, Plane, Calendar, Clock, MapPin, User } from 'lucide-react';
import type { Ticket as TicketType } from '@/Types';

interface Props {
    ticket: TicketType;
}

export default function TicketPage({ ticket }: Props) {
    const segment = ticket.segment;

    return (
        <DashboardLayout title={`Ticket ${ticket.ticket_number}`}>
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-display font-bold text-deep">E-Ticket</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <a href={`/tickets/${ticket.id}/download`}><Download className="h-4 w-4" /> PDF</a>
                        </Button>
                        <Button variant="ghost" size="sm"><Share2 className="h-4 w-4" /></Button>
                    </div>
                </div>

                <Card className="overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Plane className="h-5 w-5" />
                                <span className="font-display font-bold text-lg">Flyone</span>
                            </div>
                            <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                        </div>
                        <p className="text-primary-200 text-sm mt-2">Ticket: {ticket.ticket_number}</p>
                    </div>

                    <CardContent className="p-6 space-y-6">
                        {/* Passenger */}
                        <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-deep-lighter" />
                            <div>
                                <p className="text-xs text-deep-lighter">Passenger</p>
                                <p className="font-display font-semibold">{ticket.traveler?.full_name}</p>
                            </div>
                        </div>

                        <Separator />

                        {/* Route */}
                        {segment && (
                            <div className="flex items-center justify-between">
                                <div className="text-center">
                                    <p className="text-2xl font-display font-bold">{segment.origin_code}</p>
                                    <p className="text-sm text-deep-lighter">{segment.origin_name}</p>
                                    <p className="text-sm font-medium mt-1">{formatTime(segment.departure_at)}</p>
                                    <p className="text-xs text-deep-lighter">{formatDate(segment.departure_at)}</p>
                                </div>
                                <div className="flex-1 mx-6 flex items-center">
                                    <div className="h-px flex-1 bg-soft-dark" />
                                    <Plane className="h-5 w-5 text-primary-500 mx-2" />
                                    <div className="h-px flex-1 bg-soft-dark" />
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-display font-bold">{segment.destination_code}</p>
                                    <p className="text-sm text-deep-lighter">{segment.destination_name}</p>
                                    <p className="text-sm font-medium mt-1">{formatTime(segment.arrival_at)}</p>
                                    <p className="text-xs text-deep-lighter">{formatDate(segment.arrival_at)}</p>
                                </div>
                            </div>
                        )}

                        <Separator />

                        {/* Details Grid */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                            {ticket.seat_number && (
                                <div>
                                    <p className="text-xs text-deep-lighter">Seat</p>
                                    <p className="font-display font-bold text-lg">{ticket.seat_number}</p>
                                </div>
                            )}
                            {ticket.gate && (
                                <div>
                                    <p className="text-xs text-deep-lighter">Gate</p>
                                    <p className="font-display font-bold text-lg">{ticket.gate}</p>
                                </div>
                            )}
                            {ticket.terminal && (
                                <div>
                                    <p className="text-xs text-deep-lighter">Terminal</p>
                                    <p className="font-display font-bold text-lg">{ticket.terminal}</p>
                                </div>
                            )}
                        </div>

                        <Separator />

                        {/* QR Code */}
                        <div className="flex justify-center py-4">
                            <div className="p-4 bg-white rounded-2xl shadow-card">
                                <QRCodeSVG
                                    value={ticket.qr_code_data || ticket.ticket_number}
                                    size={180}
                                    level="M"
                                />
                            </div>
                        </div>
                        <p className="text-center text-xs text-deep-lighter">
                            Scan this QR code at check-in
                        </p>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
