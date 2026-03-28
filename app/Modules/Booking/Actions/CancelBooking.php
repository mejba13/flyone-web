<?php

namespace App\Modules\Booking\Actions;

use App\Modules\Booking\Models\Booking;
use App\Modules\Booking\Events\BookingCancelled;
use Illuminate\Support\Facades\DB;

class CancelBooking
{
    public function execute(Booking $booking, string $reason = ''): Booking
    {
        return DB::transaction(function () use ($booking, $reason) {
            $booking->update([
                'status' => 'cancelled',
                'metadata' => array_merge($booking->metadata ?? [], [
                    'cancellation_reason' => $reason,
                    'cancelled_at' => now()->toIso8601String(),
                ]),
            ]);

            $booking->tickets()->update(['status' => 'cancelled']);

            foreach ($booking->segments as $segment) {
                $segment->route?->increment('available_seats');
            }

            event(new BookingCancelled($booking));

            return $booking->fresh(['segments', 'tickets']);
        });
    }
}
