<?php

namespace App\Modules\Booking\Actions;

use App\Modules\Booking\Models\Booking;
use App\Modules\Booking\Models\Ticket;
use App\Modules\Booking\Events\BookingConfirmed;

class ConfirmBooking
{
    public function execute(Booking $booking, array $travelers): Booking
    {
        $booking->update([
            'status' => 'confirmed',
            'booked_at' => now(),
            'expires_at' => null,
        ]);

        foreach ($travelers as $traveler) {
            foreach ($booking->segments as $segment) {
                Ticket::create([
                    'booking_id' => $booking->id,
                    'traveler_id' => $traveler['id'],
                    'booking_segment_id' => $segment->id,
                    'seat_number' => $traveler['seat'] ?? null,
                    'baggage' => $traveler['baggage'] ?? null,
                    'meal_preference' => $traveler['meal'] ?? null,
                    'addons' => $traveler['addons'] ?? null,
                ]);
            }
        }

        event(new BookingConfirmed($booking));

        return $booking->load(['segments', 'tickets.traveler']);
    }
}
