<?php

namespace App\Modules\Booking\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id', 'traveler_id', 'booking_segment_id', 'ticket_number',
        'qr_code_data', 'seat_number', 'gate', 'terminal', 'status',
        'baggage', 'meal_preference', 'addons',
    ];

    protected function casts(): array
    {
        return [
            'baggage' => 'array',
            'meal_preference' => 'array',
            'addons' => 'array',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Ticket $ticket) {
            if (empty($ticket->ticket_number)) {
                $ticket->ticket_number = 'FLY-' . strtoupper(Str::random(10));
            }
            if (empty($ticket->qr_code_data)) {
                $ticket->qr_code_data = json_encode([
                    'ticket' => $ticket->ticket_number,
                    'booking' => $ticket->booking?->booking_ref,
                    'issued' => now()->toIso8601String(),
                ]);
            }
        });
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function traveler()
    {
        return $this->belongsTo(\App\Modules\User\Models\Traveler::class);
    }

    public function segment()
    {
        return $this->belongsTo(BookingSegment::class, 'booking_segment_id');
    }
}
