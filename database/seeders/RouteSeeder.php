<?php

namespace Database\Seeders;

use App\Modules\Provider\Models\Provider;
use App\Modules\Search\Models\Route;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class RouteSeeder extends Seeder
{
    public function run(): void
    {
        $airlines = Provider::where('type', 'airline')->pluck('id', 'slug');
        $railways = Provider::where('type', 'railway')->pluck('id', 'slug');
        $buses = Provider::where('type', 'bus')->pluck('id', 'slug');
        $ferries = Provider::where('type', 'ferry')->pluck('id', 'slug');

        $flightRoutes = [
            ['origin_code' => 'BKK', 'origin_name' => 'Bangkok', 'destination_code' => 'SIN', 'destination_name' => 'Singapore', 'duration' => 150, 'base_price' => 89],
            ['origin_code' => 'SIN', 'origin_name' => 'Singapore', 'destination_code' => 'BKK', 'destination_name' => 'Bangkok', 'duration' => 150, 'base_price' => 95],
            ['origin_code' => 'BKK', 'origin_name' => 'Bangkok', 'destination_code' => 'DPS', 'destination_name' => 'Bali', 'duration' => 270, 'base_price' => 120],
            ['origin_code' => 'SIN', 'origin_name' => 'Singapore', 'destination_code' => 'DPS', 'destination_name' => 'Bali', 'duration' => 165, 'base_price' => 105],
            ['origin_code' => 'KUL', 'origin_name' => 'Kuala Lumpur', 'destination_code' => 'BKK', 'destination_name' => 'Bangkok', 'duration' => 135, 'base_price' => 75],
            ['origin_code' => 'BKK', 'origin_name' => 'Bangkok', 'destination_code' => 'HAN', 'destination_name' => 'Hanoi', 'duration' => 120, 'base_price' => 85],
            ['origin_code' => 'SGN', 'origin_name' => 'Ho Chi Minh City', 'destination_code' => 'SIN', 'destination_name' => 'Singapore', 'duration' => 130, 'base_price' => 78],
            ['origin_code' => 'SIN', 'origin_name' => 'Singapore', 'destination_code' => 'MNL', 'destination_name' => 'Manila', 'duration' => 210, 'base_price' => 110],
            ['origin_code' => 'BKK', 'origin_name' => 'Bangkok', 'destination_code' => 'HKT', 'destination_name' => 'Phuket', 'duration' => 80, 'base_price' => 45],
            ['origin_code' => 'BKK', 'origin_name' => 'Bangkok', 'destination_code' => 'CNX', 'destination_name' => 'Chiang Mai', 'duration' => 75, 'base_price' => 40],
            ['origin_code' => 'SIN', 'origin_name' => 'Singapore', 'destination_code' => 'HKG', 'destination_name' => 'Hong Kong', 'duration' => 240, 'base_price' => 180],
            ['origin_code' => 'KUL', 'origin_name' => 'Kuala Lumpur', 'destination_code' => 'SIN', 'destination_name' => 'Singapore', 'duration' => 60, 'base_price' => 35],
            ['origin_code' => 'SGN', 'origin_name' => 'Ho Chi Minh City', 'destination_code' => 'DAD', 'destination_name' => 'Da Nang', 'duration' => 80, 'base_price' => 42],
            ['origin_code' => 'HAN', 'origin_name' => 'Hanoi', 'destination_code' => 'SGN', 'destination_name' => 'Ho Chi Minh City', 'duration' => 120, 'base_price' => 65],
            ['origin_code' => 'DPS', 'origin_name' => 'Bali', 'destination_code' => 'CGK', 'destination_name' => 'Jakarta', 'duration' => 105, 'base_price' => 55],
            ['origin_code' => 'SIN', 'origin_name' => 'Singapore', 'destination_code' => 'TPE', 'destination_name' => 'Taipei', 'duration' => 280, 'base_price' => 200],
            ['origin_code' => 'BKK', 'origin_name' => 'Bangkok', 'destination_code' => 'REP', 'destination_name' => 'Siem Reap', 'duration' => 65, 'base_price' => 55],
            ['origin_code' => 'KUL', 'origin_name' => 'Kuala Lumpur', 'destination_code' => 'PEN', 'destination_name' => 'Penang', 'duration' => 60, 'base_price' => 30],
            ['origin_code' => 'MNL', 'origin_name' => 'Manila', 'destination_code' => 'MPH', 'destination_name' => 'Boracay', 'duration' => 60, 'base_price' => 48],
            ['origin_code' => 'SIN', 'origin_name' => 'Singapore', 'destination_code' => 'CMB', 'destination_name' => 'Colombo', 'duration' => 240, 'base_price' => 165],
        ];

        $providerSlugs = ['airasia', 'singapore-airlines', 'thai-airways', 'vietnam-airlines', 'garuda-indonesia'];
        $classes = ['economy', 'premium_economy', 'business'];

        foreach ($flightRoutes as $fr) {
            // Create multiple departures over the next 60 days
            for ($day = 1; $day <= 60; $day += rand(1, 3)) {
                $providerSlug = $providerSlugs[array_rand($providerSlugs)];
                $providerId = $airlines[$providerSlug] ?? $airlines->first();

                $departureTime = Carbon::now()->addDays($day)->setHour(rand(6, 22))->setMinute(rand(0, 3) * 15);
                $arrivalTime = $departureTime->copy()->addMinutes($fr['duration']);
                $class = $classes[array_rand($classes)];
                $priceMultiplier = match ($class) {
                    'business' => 2.8,
                    'premium_economy' => 1.6,
                    default => 1.0,
                };

                Route::create([
                    'provider_id' => $providerId,
                    'route_number' => strtoupper(substr($providerSlug, 0, 2)) . rand(100, 999),
                    'origin_code' => $fr['origin_code'],
                    'origin_name' => $fr['origin_name'],
                    'destination_code' => $fr['destination_code'],
                    'destination_name' => $fr['destination_name'],
                    'departure_at' => $departureTime,
                    'arrival_at' => $arrivalTime,
                    'duration_minutes' => $fr['duration'],
                    'mode' => 'flight',
                    'class' => $class,
                    'base_price' => round($fr['base_price'] * $priceMultiplier * (0.8 + (rand(0, 40) / 100)), 2),
                    'currency' => 'USD',
                    'available_seats' => rand(5, 180),
                    'total_seats' => 180,
                    'stops' => rand(0, 10) > 7 ? 1 : 0,
                    'amenities' => ['wifi', 'usb_charging', 'entertainment'],
                    'is_active' => true,
                ]);
            }
        }

        // Train routes
        $trainRoutes = [
            ['origin_code' => 'KUL', 'origin_name' => 'Kuala Lumpur', 'destination_code' => 'SIN', 'destination_name' => 'Singapore', 'duration' => 420, 'base_price' => 25, 'provider' => 'ktm-railway'],
            ['origin_code' => 'BKK', 'origin_name' => 'Bangkok', 'destination_code' => 'CNX', 'destination_name' => 'Chiang Mai', 'duration' => 720, 'base_price' => 18, 'provider' => 'srt-thailand'],
            ['origin_code' => 'KUL', 'origin_name' => 'Kuala Lumpur', 'destination_code' => 'PEN', 'destination_name' => 'Penang', 'duration' => 300, 'base_price' => 15, 'provider' => 'ktm-railway'],
        ];

        foreach ($trainRoutes as $tr) {
            for ($day = 1; $day <= 30; $day++) {
                $dep = Carbon::now()->addDays($day)->setHour(rand(6, 18))->setMinute(0);
                Route::create([
                    'provider_id' => $railways[$tr['provider']] ?? $railways->first(),
                    'route_number' => 'TR' . rand(100, 999),
                    'origin_code' => $tr['origin_code'],
                    'origin_name' => $tr['origin_name'],
                    'destination_code' => $tr['destination_code'],
                    'destination_name' => $tr['destination_name'],
                    'departure_at' => $dep,
                    'arrival_at' => $dep->copy()->addMinutes($tr['duration']),
                    'duration_minutes' => $tr['duration'],
                    'mode' => 'train',
                    'class' => rand(0, 1) ? 'economy' : 'business',
                    'base_price' => $tr['base_price'] * (0.9 + (rand(0, 20) / 100)),
                    'currency' => 'USD',
                    'available_seats' => rand(10, 200),
                    'total_seats' => 200,
                    'stops' => rand(2, 8),
                    'amenities' => ['air_conditioning', 'food_cart'],
                    'is_active' => true,
                ]);
            }
        }

        // Bus routes
        $busRoutes = [
            ['origin_code' => 'SIN', 'origin_name' => 'Singapore', 'destination_code' => 'KUL', 'destination_name' => 'Kuala Lumpur', 'duration' => 360, 'base_price' => 18, 'provider' => 'easybook-express'],
            ['origin_code' => 'PNH', 'origin_name' => 'Phnom Penh', 'destination_code' => 'SGN', 'destination_name' => 'Ho Chi Minh City', 'duration' => 420, 'base_price' => 12, 'provider' => 'mekong-express'],
        ];

        foreach ($busRoutes as $br) {
            for ($day = 1; $day <= 30; $day++) {
                $dep = Carbon::now()->addDays($day)->setHour(rand(6, 20))->setMinute(0);
                Route::create([
                    'provider_id' => $buses[$br['provider']] ?? $buses->first(),
                    'route_number' => 'BUS' . rand(100, 999),
                    'origin_code' => $br['origin_code'],
                    'origin_name' => $br['origin_name'],
                    'destination_code' => $br['destination_code'],
                    'destination_name' => $br['destination_name'],
                    'departure_at' => $dep,
                    'arrival_at' => $dep->copy()->addMinutes($br['duration']),
                    'duration_minutes' => $br['duration'],
                    'mode' => 'bus',
                    'class' => 'economy',
                    'base_price' => $br['base_price'],
                    'currency' => 'USD',
                    'available_seats' => rand(5, 45),
                    'total_seats' => 45,
                    'stops' => rand(1, 4),
                    'amenities' => ['air_conditioning', 'wifi'],
                    'is_active' => true,
                ]);
            }
        }

        // Ferry routes
        $ferryRoutes = [
            ['origin_code' => 'SIN', 'origin_name' => 'Singapore', 'destination_code' => 'BTH', 'destination_name' => 'Bintan', 'duration' => 60, 'base_price' => 35],
        ];

        foreach ($ferryRoutes as $fry) {
            for ($day = 1; $day <= 30; $day++) {
                $dep = Carbon::now()->addDays($day)->setHour(rand(8, 16))->setMinute(0);
                Route::create([
                    'provider_id' => $ferries->first(),
                    'route_number' => 'FRY' . rand(100, 999),
                    'origin_code' => $fry['origin_code'],
                    'origin_name' => $fry['origin_name'],
                    'destination_code' => $fry['destination_code'],
                    'destination_name' => $fry['destination_name'],
                    'departure_at' => $dep,
                    'arrival_at' => $dep->copy()->addMinutes($fry['duration']),
                    'duration_minutes' => $fry['duration'],
                    'mode' => 'ferry',
                    'class' => 'economy',
                    'base_price' => $fry['base_price'],
                    'currency' => 'USD',
                    'available_seats' => rand(20, 100),
                    'total_seats' => 100,
                    'stops' => 0,
                    'amenities' => ['air_conditioning', 'snack_bar'],
                    'is_active' => true,
                ]);
            }
        }
    }
}
