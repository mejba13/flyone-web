<?php

namespace App\Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Booking\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class TicketController extends Controller
{
    public function show(Request $request, Ticket $ticket)
    {
        $ticket->load(['booking.segments', 'traveler', 'segment']);

        return Inertia::render('Dashboard/Ticket', [
            'ticket' => $ticket,
        ]);
    }

    public function download(Ticket $ticket)
    {
        $ticket->load(['booking.segments', 'traveler', 'segment']);

        $pdf = Pdf::loadView('pdf.ticket', ['ticket' => $ticket]);

        return $pdf->download("ticket-{$ticket->ticket_number}.pdf");
    }
}
