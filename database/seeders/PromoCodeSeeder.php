<?php

namespace Database\Seeders;

use App\Modules\Loyalty\Models\PromoCode;
use Illuminate\Database\Seeder;

class PromoCodeSeeder extends Seeder
{
    public function run(): void
    {
        $promos = [
            ['code' => 'WELCOME10', 'name' => 'Welcome Discount', 'description' => '10% off your first booking', 'type' => 'percentage', 'value' => 10, 'min_order' => 50, 'max_discount' => 30, 'usage_limit' => 1000, 'per_user_limit' => 1, 'valid_from' => now(), 'valid_until' => now()->addMonths(6)],
            ['code' => 'SUMMER25', 'name' => 'Summer Sale', 'description' => '$25 off summer bookings', 'type' => 'fixed', 'value' => 25, 'min_order' => 100, 'max_discount' => null, 'usage_limit' => 500, 'per_user_limit' => 2, 'valid_from' => now(), 'valid_until' => now()->addMonths(3)],
            ['code' => 'FLY15', 'name' => 'Flight Discount', 'description' => '15% off all flights', 'type' => 'percentage', 'value' => 15, 'min_order' => 75, 'max_discount' => 50, 'usage_limit' => 2000, 'per_user_limit' => 3, 'valid_from' => now(), 'valid_until' => now()->addYear()],
            ['code' => 'BALI20', 'name' => 'Bali Special', 'description' => '$20 off Bali routes', 'type' => 'fixed', 'value' => 20, 'min_order' => 80, 'max_discount' => null, 'usage_limit' => 300, 'per_user_limit' => 1, 'valid_from' => now(), 'valid_until' => now()->addMonths(2)],
            ['code' => 'LOYALTY5', 'name' => 'Loyalty Bonus', 'description' => '5% off for returning customers', 'type' => 'percentage', 'value' => 5, 'min_order' => 0, 'max_discount' => 20, 'usage_limit' => null, 'per_user_limit' => 10, 'valid_from' => now(), 'valid_until' => now()->addYear()],
        ];

        foreach ($promos as $promo) {
            PromoCode::create($promo);
        }
    }
}
