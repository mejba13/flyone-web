<?php

namespace App\Modules\Booking\Actions;

use App\Modules\Booking\Models\Booking;
use App\Modules\Booking\Models\BookingSegment;
use App\Modules\Booking\Events\BookingCreated;
use App\Modules\Search\Models\Route;
use Illuminate\Support\Facades\DB;

class CreateBooking
{
    public function execute(array $data): Booking
    {
        return DB::transaction(function () use ($data) {
            $route = Route::findOrFail($data['route_id']);

            $subtotal = $route->base_price * ($data['passenger_count'] ?? 1);
            $taxAmount = round($subtotal * 0.1, 2);
            $discountAmount = $data['discount_amount'] ?? 0;
            $totalAmount = $subtotal + $taxAmount - $discountAmount;

            $booking = Booking::create([
                'user_id' => $data['user_id'],
                'status' => 'pending',
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'discount_amount' => $discountAmount,
                'total_amount' => $totalAmount,
                'currency' => $route->currency,
                'promo_code_id' => $data['promo_code_id'] ?? null,
                'expires_at' => now()->addMinutes(30),
                'contact_email' => $data['contact_email'],
                'contact_phone' => $data['contact_phone'] ?? null,
                'special_requests' => $data['special_requests'] ?? null,
                'metadata' => $data['metadata'] ?? null,
            ]);

            BookingSegment::create([
                'booking_id' => $booking->id,
                'route_id' => $route->id,
                'segment_order' => 1,
                'origin_code' => $route->origin_code,
                'origin_name' => $route->origin_name,
                'destination_code' => $route->destination_code,
                'destination_name' => $route->destination_name,
                'departure_at' => $route->departure_at,
                'arrival_at' => $route->arrival_at,
                'carrier_name' => $route->provider->name,
                'carrier_logo' => $route->provider->logo_url,
                'vehicle_number' => $route->route_number,
                'class' => $route->class,
            ]);

            if (!empty($data['return_route_id'])) {
                $returnRoute = Route::findOrFail($data['return_route_id']);
                BookingSegment::create([
                    'booking_id' => $booking->id,
                    'route_id' => $returnRoute->id,
                    'segment_order' => 2,
                    'origin_code' => $returnRoute->origin_code,
                    'origin_name' => $returnRoute->origin_name,
                    'destination_code' => $returnRoute->destination_code,
                    'destination_name' => $returnRoute->destination_name,
                    'departure_at' => $returnRoute->departure_at,
                    'arrival_at' => $returnRoute->arrival_at,
                    'carrier_name' => $returnRoute->provider->name,
                    'carrier_logo' => $returnRoute->provider->logo_url,
                    'vehicle_number' => $returnRoute->route_number,
                    'class' => $returnRoute->class,
                ]);
            }

            $route->decrement('available_seats', $data['passenger_count'] ?? 1);

            event(new BookingCreated($booking));

            return $booking->load(['segments', 'user']);
        });
    }
}
