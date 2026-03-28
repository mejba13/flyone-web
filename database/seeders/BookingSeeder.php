<?php

namespace Database\Seeders;

use App\Modules\Booking\Models\Booking;
use App\Modules\Booking\Models\BookingSegment;
use App\Modules\Booking\Models\Ticket;
use App\Modules\Loyalty\Models\LoyaltyPoint;
use App\Modules\Payment\Models\Transaction;
use App\Modules\Provider\Models\Review;
use App\Modules\Search\Models\Route;
use App\Modules\User\Models\Notification;
use App\Modules\User\Models\Traveler;
use App\Modules\User\Models\User;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::role('user')->get();
        $flightRoutes = Route::with('provider')->where('mode', 'flight')->inRandomOrder()->limit(80)->get();
        $trainRoutes = Route::with('provider')->where('mode', 'train')->inRandomOrder()->limit(20)->get();
        $busRoutes = Route::with('provider')->where('mode', 'bus')->inRandomOrder()->limit(15)->get();
        $ferryRoutes = Route::with('provider')->where('mode', 'ferry')->inRandomOrder()->limit(10)->get();
        $allRoutes = $flightRoutes->merge($trainRoutes)->merge($busRoutes)->merge($ferryRoutes);
        $statuses = ['confirmed', 'confirmed', 'confirmed', 'confirmed', 'completed', 'completed', 'completed', 'cancelled'];
        $meals = [['type' => 'standard', 'choice' => 'chicken'], ['type' => 'vegetarian', 'choice' => 'veggie pasta'], ['type' => 'premium', 'choice' => 'grilled salmon'], null];
        $baggageOptions = [['weight' => '20kg', 'type' => 'checked'], ['weight' => '30kg', 'type' => 'checked'], null];

        // Ensure demo user has saved travelers
        $demoUser = User::where('email', 'demo@flyone.com')->first();
        $this->ensureTravelers($users);

        foreach ($users as $user) {
            $numBookings = rand(2, 6);
            for ($i = 0; $i < $numBookings; $i++) {
                $route = $allRoutes->random();
                $status = $statuses[array_rand($statuses)];
                $passengerCount = rand(1, 3);
                $subtotal = (float) $route->base_price * $passengerCount;
                $tax = round($subtotal * 0.1, 2);
                $discount = rand(0, 3) === 0 ? round(rand(5, 25) * 1.0, 2) : 0;
                $total = $subtotal + $tax - $discount;

                $bookedAt = now()->subDays(rand(1, 120));

                $booking = Booking::create([
                    'user_id' => $user->id,
                    'status' => $status,
                    'subtotal' => $subtotal,
                    'tax_amount' => $tax,
                    'discount_amount' => $discount,
                    'total_amount' => $total,
                    'currency' => 'USD',
                    'booked_at' => $bookedAt,
                    'contact_email' => $user->email,
                    'contact_phone' => '+' . rand(1, 65) . rand(100000000, 999999999),
                    'special_requests' => rand(0, 4) === 0 ? 'Window seat preferred' : null,
                    'metadata' => [
                        'source' => ['web', 'mobile', 'api'][array_rand(['web', 'mobile', 'api'])],
                        'ip' => rand(1, 255) . '.' . rand(0, 255) . '.' . rand(0, 255) . '.' . rand(1, 255),
                    ],
                ]);

                // Create segment
                $segment = BookingSegment::create([
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
                    'status' => match ($status) {
                        'completed' => 'arrived',
                        'cancelled' => 'cancelled',
                        default => 'scheduled',
                    },
                ]);

                // Create tickets for each passenger
                $travelers = $user->travelers()->limit($passengerCount)->get();
                foreach ($travelers as $traveler) {
                    Ticket::create([
                        'booking_id' => $booking->id,
                        'traveler_id' => $traveler->id,
                        'booking_segment_id' => $segment->id,
                        'seat_number' => rand(1, 35) . chr(rand(65, 70)),
                        'gate' => 'G' . rand(1, 30),
                        'terminal' => 'T' . rand(1, 4),
                        'status' => match ($status) {
                            'completed' => 'completed',
                            'cancelled' => 'cancelled',
                            default => 'issued',
                        },
                        'baggage' => $baggageOptions[array_rand($baggageOptions)],
                        'meal_preference' => $meals[array_rand($meals)],
                        'addons' => rand(0, 3) === 0 ? ['insurance' => true, 'lounge' => rand(0, 1) === 1] : null,
                    ]);
                }

                // Create transaction for non-cancelled bookings
                if ($status !== 'cancelled') {
                    Transaction::create([
                        'booking_id' => $booking->id,
                        'user_id' => $user->id,
                        'amount' => $total,
                        'currency' => 'USD',
                        'method' => ['card', 'card', 'card', 'wallet'][array_rand(['card', 'card', 'card', 'wallet'])],
                        'gateway' => 'stripe',
                        'gateway_ref' => 'pi_' . strtolower(\Illuminate\Support\Str::random(24)),
                        'gateway_status' => 'succeeded',
                        'status' => $status === 'refunded' ? 'refunded' : 'completed',
                        'refund_amount' => $status === 'refunded' ? $total : 0,
                        'completed_at' => $bookedAt->copy()->addMinutes(rand(1, 5)),
                        'metadata' => ['card_last4' => str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT)],
                    ]);

                    // Award loyalty points
                    $points = (int) ($total * 10);
                    LoyaltyPoint::create([
                        'user_id' => $user->id,
                        'points' => $points,
                        'type' => 'earned',
                        'source' => 'booking',
                        'reference_type' => 'booking',
                        'reference_id' => $booking->id,
                        'description' => "Points for booking {$booking->booking_ref}",
                        'expires_at' => now()->addYear(),
                    ]);
                }

                // Create review for completed bookings (50% chance)
                if ($status === 'completed' && rand(0, 1) === 1) {
                    $rating = rand(3, 5);
                    $reviewTitles = [
                        5 => ['Amazing experience!', 'Perfect trip', 'Absolutely loved it', 'Best travel experience'],
                        4 => ['Great service', 'Good overall', 'Would recommend', 'Nice journey'],
                        3 => ['Decent trip', 'Average experience', 'It was okay', 'Could be better'],
                    ];
                    $reviewBodies = [
                        5 => ['Everything was perfect from boarding to arrival. The staff was incredibly friendly and the service was top-notch.', 'Smooth check-in, comfortable seats, and arrived on time. Will definitely book again!', 'One of the best travel experiences I\'ve had. Clean, punctual, and excellent food options.'],
                        4 => ['Overall a good experience. Slight delay but staff handled it well.', 'Comfortable journey with good amenities. Food could be better.', 'Professional service and clean facilities. Would fly with them again.'],
                        3 => ['The trip was okay but departure was delayed by 30 minutes.', 'Average experience. Nothing special but nothing terrible either.', 'Decent service but the seats were a bit cramped for a long journey.'],
                    ];

                    Review::create([
                        'user_id' => $user->id,
                        'provider_id' => $route->provider_id,
                        'route_id' => $route->id,
                        'booking_id' => $booking->id,
                        'rating' => $rating,
                        'title' => $reviewTitles[$rating][array_rand($reviewTitles[$rating])],
                        'body' => $reviewBodies[$rating][array_rand($reviewBodies[$rating])],
                        'is_verified' => true,
                        'ratings_breakdown' => [
                            'comfort' => rand($rating - 1, 5),
                            'service' => rand($rating - 1, 5),
                            'punctuality' => rand($rating - 1, 5),
                            'value' => rand($rating - 1, 5),
                        ],
                    ]);
                }

                // Create notification
                Notification::create([
                    'user_id' => $user->id,
                    'type' => 'booking_' . $status,
                    'title' => match ($status) {
                        'confirmed' => "Booking {$booking->booking_ref} confirmed",
                        'completed' => "Trip {$booking->booking_ref} completed",
                        'cancelled' => "Booking {$booking->booking_ref} cancelled",
                        default => "Booking {$booking->booking_ref} updated",
                    },
                    'body' => match ($status) {
                        'confirmed' => "Your booking from {$route->origin_name} to {$route->destination_name} is confirmed. Have a great trip!",
                        'completed' => "Hope you enjoyed your trip from {$route->origin_name} to {$route->destination_name}. Don't forget to leave a review!",
                        'cancelled' => "Your booking from {$route->origin_name} to {$route->destination_name} has been cancelled.",
                        default => "Your booking has been updated.",
                    },
                    'data' => ['booking_id' => $booking->id, 'booking_ref' => $booking->booking_ref],
                    'channel' => 'web',
                    'category' => 'booking',
                    'read_at' => rand(0, 2) > 0 ? $bookedAt->copy()->addHours(rand(1, 48)) : null,
                    'created_at' => $bookedAt,
                ]);
            }
        }

        // Create additional notifications (promos, loyalty, system)
        $this->createPromoNotifications($users);
        $this->createLoyaltyNotifications($users);
        $this->createSystemNotifications($users);

        // Create bonus loyalty points (referrals, bonuses)
        $this->createBonusLoyaltyPoints($users);
    }

    private function ensureTravelers($users): void
    {
        $nationalities = ['USA', 'GBR', 'AUS', 'CAN', 'SGP', 'MYS', 'THA', 'IDN', 'VNM', 'PHL', 'JPN', 'KOR', 'DEU', 'FRA', 'NLD'];

        foreach ($users as $user) {
            if ($user->travelers()->count() === 0) {
                $nameParts = explode(' ', $user->name);
                Traveler::create([
                    'user_id' => $user->id,
                    'full_name' => $user->name,
                    'date_of_birth' => now()->subYears(rand(22, 55))->subDays(rand(0, 365))->format('Y-m-d'),
                    'nationality' => $nationalities[array_rand($nationalities)],
                    'passport_number' => strtoupper(substr($nameParts[0] ?? 'X', 0, 2)) . rand(10000000, 99999999),
                    'passport_expiry' => now()->addYears(rand(2, 8))->format('Y-m-d'),
                    'gender' => ['male', 'female'][array_rand(['male', 'female'])],
                    'is_primary' => true,
                    'email' => $user->email,
                ]);

                // 40% chance of second traveler (companion)
                if (rand(0, 4) < 2) {
                    $companionNames = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Jamie'];
                    Traveler::create([
                        'user_id' => $user->id,
                        'full_name' => $companionNames[array_rand($companionNames)] . ' ' . ($nameParts[1] ?? 'Smith'),
                        'date_of_birth' => now()->subYears(rand(20, 50))->subDays(rand(0, 365))->format('Y-m-d'),
                        'nationality' => $nationalities[array_rand($nationalities)],
                        'passport_number' => strtoupper(\Illuminate\Support\Str::random(2)) . rand(10000000, 99999999),
                        'passport_expiry' => now()->addYears(rand(2, 8))->format('Y-m-d'),
                        'gender' => ['male', 'female'][array_rand(['male', 'female'])],
                        'is_primary' => false,
                    ]);
                }
            }
        }
    }

    private function createPromoNotifications($users): void
    {
        $promos = [
            ['title' => 'Flash Sale: 20% off all flights!', 'body' => 'Book before midnight to get 20% off all Southeast Asia flights. Use code FLASH20.'],
            ['title' => 'Weekend getaway deals from $49', 'body' => 'Escape for the weekend! Flights and trains starting at just $49. Limited seats available.'],
            ['title' => 'New route: Singapore to Colombo', 'body' => 'We\'ve added direct flights from Singapore to Colombo! Book now from $165.'],
            ['title' => 'Double points this week!', 'body' => 'Earn 2x loyalty points on all bookings made this week. Don\'t miss out!'],
            ['title' => 'Early bird fares released', 'body' => 'We\'ve released new fares for the next 3 months. Book early for the best prices!'],
        ];

        foreach ($users->random(min(30, $users->count())) as $user) {
            $promo = $promos[array_rand($promos)];
            Notification::create([
                'user_id' => $user->id,
                'type' => 'promotion',
                'title' => $promo['title'],
                'body' => $promo['body'],
                'data' => ['promo_type' => 'flash_sale'],
                'channel' => 'web',
                'category' => 'promotion',
                'read_at' => rand(0, 2) > 0 ? now()->subDays(rand(1, 14)) : null,
                'created_at' => now()->subDays(rand(1, 30)),
            ]);
        }
    }

    private function createLoyaltyNotifications($users): void
    {
        foreach ($users->random(min(15, $users->count())) as $user) {
            Notification::create([
                'user_id' => $user->id,
                'type' => 'loyalty_milestone',
                'title' => 'Congratulations! You earned ' . rand(100, 2000) . ' points',
                'body' => 'Your recent booking earned you bonus loyalty points. Keep traveling to reach the next tier!',
                'data' => ['points' => rand(100, 2000)],
                'channel' => 'web',
                'category' => 'loyalty',
                'read_at' => rand(0, 1) ? now()->subDays(rand(1, 7)) : null,
                'created_at' => now()->subDays(rand(1, 45)),
            ]);
        }
    }

    private function createSystemNotifications($users): void
    {
        $systemNotifs = [
            ['title' => 'Profile updated', 'body' => 'Your profile information has been updated successfully.'],
            ['title' => 'Password changed', 'body' => 'Your password was changed. If this wasn\'t you, please contact support immediately.'],
            ['title' => 'New feature: AI Travel Assistant', 'body' => 'Try our new AI-powered travel assistant! Get personalized recommendations and instant answers.'],
            ['title' => 'Travel advisory update', 'body' => 'Please check the latest travel advisories for your upcoming destination.'],
        ];

        foreach ($users->random(min(20, $users->count())) as $user) {
            $notif = $systemNotifs[array_rand($systemNotifs)];
            Notification::create([
                'user_id' => $user->id,
                'type' => 'system',
                'title' => $notif['title'],
                'body' => $notif['body'],
                'channel' => 'web',
                'category' => 'system',
                'read_at' => rand(0, 1) ? now()->subDays(rand(1, 30)) : null,
                'created_at' => now()->subDays(rand(1, 60)),
            ]);
        }
    }

    private function createBonusLoyaltyPoints($users): void
    {
        foreach ($users->random(min(25, $users->count())) as $user) {
            // Welcome bonus
            LoyaltyPoint::create([
                'user_id' => $user->id,
                'points' => 500,
                'type' => 'bonus',
                'source' => 'welcome',
                'description' => 'Welcome bonus for joining Flyone',
                'expires_at' => now()->addYear(),
                'created_at' => $user->created_at,
            ]);

            // Referral bonus (some users)
            if (rand(0, 3) === 0) {
                LoyaltyPoint::create([
                    'user_id' => $user->id,
                    'points' => 1000,
                    'type' => 'referral',
                    'source' => 'referral',
                    'description' => 'Referral bonus - friend signed up and booked',
                    'expires_at' => now()->addYear(),
                    'created_at' => now()->subDays(rand(1, 90)),
                ]);
            }

            // Point redemptions (some users)
            if ($user->points_balance > 2000 && rand(0, 2) === 0) {
                $redeemAmount = rand(1, 5) * 500;
                LoyaltyPoint::create([
                    'user_id' => $user->id,
                    'points' => -$redeemAmount,
                    'type' => 'redeemed',
                    'source' => 'redemption',
                    'description' => "Redeemed {$redeemAmount} points for booking discount",
                    'created_at' => now()->subDays(rand(1, 60)),
                ]);
            }
        }
    }
}
