<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>E-Ticket {{ $ticket->ticket_number }}</title>
    <style>
        body { font-family: 'Helvetica', sans-serif; margin: 0; padding: 20px; color: #1A1A2E; }
        .header { background: linear-gradient(135deg, #A78BFA, #7C3AED); color: white; padding: 20px; border-radius: 12px 12px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .header p { margin: 5px 0 0; opacity: 0.8; }
        .content { border: 1px solid #EEF0F6; border-top: 0; padding: 20px; border-radius: 0 0 12px 12px; }
        .route { display: flex; justify-content: space-between; align-items: center; margin: 20px 0; }
        .route .city { text-align: center; }
        .route .city .code { font-size: 28px; font-weight: bold; }
        .route .city .name { font-size: 12px; color: #3F3F5C; }
        .route .arrow { font-size: 24px; color: #A78BFA; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 20px 0; }
        .info-item { text-align: center; padding: 10px; background: #F8F9FC; border-radius: 8px; }
        .info-item .label { font-size: 10px; color: #3F3F5C; text-transform: uppercase; }
        .info-item .value { font-size: 18px; font-weight: bold; margin-top: 4px; }
        .passenger { margin: 15px 0; padding: 15px; background: #F8F9FC; border-radius: 8px; }
        .passenger .name { font-size: 16px; font-weight: bold; }
        .passenger .details { font-size: 12px; color: #3F3F5C; margin-top: 4px; }
        .footer { text-align: center; margin-top: 20px; font-size: 11px; color: #3F3F5C; }
        .qr-placeholder { text-align: center; margin: 20px 0; padding: 20px; border: 2px dashed #EEF0F6; border-radius: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Flyone E-Ticket</h1>
        <p>Ticket: {{ $ticket->ticket_number }}</p>
    </div>

    <div class="content">
        <div class="passenger">
            <div class="name">{{ $ticket->traveler->full_name }}</div>
            <div class="details">
                Nationality: {{ $ticket->traveler->nationality }}
                @if($ticket->traveler->passport_number)
                    | Passport: {{ $ticket->traveler->passport_number }}
                @endif
            </div>
        </div>

        @if($ticket->segment)
        <div class="route">
            <div class="city">
                <div class="code">{{ $ticket->segment->origin_code }}</div>
                <div class="name">{{ $ticket->segment->origin_name }}</div>
                <div class="name">{{ $ticket->segment->departure_at->format('H:i') }}</div>
                <div class="name">{{ $ticket->segment->departure_at->format('d M Y') }}</div>
            </div>
            <div class="arrow">&rarr;</div>
            <div class="city">
                <div class="code">{{ $ticket->segment->destination_code }}</div>
                <div class="name">{{ $ticket->segment->destination_name }}</div>
                <div class="name">{{ $ticket->segment->arrival_at->format('H:i') }}</div>
                <div class="name">{{ $ticket->segment->arrival_at->format('d M Y') }}</div>
            </div>
        </div>
        @endif

        <div class="info-grid">
            @if($ticket->seat_number)
            <div class="info-item">
                <div class="label">Seat</div>
                <div class="value">{{ $ticket->seat_number }}</div>
            </div>
            @endif
            @if($ticket->gate)
            <div class="info-item">
                <div class="label">Gate</div>
                <div class="value">{{ $ticket->gate }}</div>
            </div>
            @endif
            @if($ticket->terminal)
            <div class="info-item">
                <div class="label">Terminal</div>
                <div class="value">{{ $ticket->terminal }}</div>
            </div>
            @endif
        </div>

        <div class="info-grid">
            <div class="info-item">
                <div class="label">Booking Ref</div>
                <div class="value">{{ $ticket->booking->booking_ref }}</div>
            </div>
            <div class="info-item">
                <div class="label">Status</div>
                <div class="value" style="text-transform: capitalize;">{{ $ticket->status }}</div>
            </div>
            <div class="info-item">
                <div class="label">Class</div>
                <div class="value" style="text-transform: capitalize;">{{ $ticket->segment?->class ?? 'Economy' }}</div>
            </div>
        </div>

        <div class="qr-placeholder">
            <p style="font-size: 14px; font-weight: bold;">QR Code</p>
            <p style="font-size: 11px;">Scan at check-in counter</p>
            <p style="font-family: monospace; font-size: 10px;">{{ $ticket->qr_code_data }}</p>
        </div>
    </div>

    <div class="footer">
        <p>This is an electronic ticket. Please present this document at check-in.</p>
        <p>&copy; {{ date('Y') }} Flyone. All rights reserved.</p>
    </div>
</body>
</html>
