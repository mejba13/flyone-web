<?php

namespace Database\Seeders;

use App\Modules\Provider\Models\Provider;
use Illuminate\Database\Seeder;

class ProviderSeeder extends Seeder
{
    public function run(): void
    {
        $providers = [
            ['name' => 'AirAsia', 'slug' => 'airasia', 'type' => 'airline', 'country' => 'MYS', 'commission_rate' => 8.5, 'rating' => 4.2, 'review_count' => 2450, 'description' => 'Low-cost carrier serving Southeast Asia and beyond', 'status' => 'active'],
            ['name' => 'Singapore Airlines', 'slug' => 'singapore-airlines', 'type' => 'airline', 'country' => 'SGP', 'commission_rate' => 6.0, 'rating' => 4.8, 'review_count' => 5200, 'description' => 'Premium full-service airline', 'status' => 'active'],
            ['name' => 'Thai Airways', 'slug' => 'thai-airways', 'type' => 'airline', 'country' => 'THA', 'commission_rate' => 7.0, 'rating' => 4.3, 'review_count' => 1800, 'description' => 'Flag carrier of Thailand', 'status' => 'active'],
            ['name' => 'Vietnam Airlines', 'slug' => 'vietnam-airlines', 'type' => 'airline', 'country' => 'VNM', 'commission_rate' => 7.5, 'rating' => 4.1, 'review_count' => 1200, 'description' => 'National airline of Vietnam', 'status' => 'active'],
            ['name' => 'Garuda Indonesia', 'slug' => 'garuda-indonesia', 'type' => 'airline', 'country' => 'IDN', 'commission_rate' => 7.0, 'rating' => 4.0, 'review_count' => 980, 'description' => 'Indonesia\'s flag carrier', 'status' => 'active'],
            ['name' => 'KTM Railway', 'slug' => 'ktm-railway', 'type' => 'railway', 'country' => 'MYS', 'commission_rate' => 5.0, 'rating' => 3.8, 'review_count' => 650, 'description' => 'Malaysian national railway operator', 'status' => 'active'],
            ['name' => 'SRT Thailand', 'slug' => 'srt-thailand', 'type' => 'railway', 'country' => 'THA', 'commission_rate' => 5.0, 'rating' => 3.6, 'review_count' => 420, 'description' => 'State Railway of Thailand', 'status' => 'active'],
            ['name' => 'Easybook Express', 'slug' => 'easybook-express', 'type' => 'bus', 'country' => 'SGP', 'commission_rate' => 10.0, 'rating' => 4.0, 'review_count' => 890, 'description' => 'Premium bus service across Malaysia and Singapore', 'status' => 'active'],
            ['name' => 'Mekong Express', 'slug' => 'mekong-express', 'type' => 'bus', 'country' => 'KHM', 'commission_rate' => 12.0, 'rating' => 3.9, 'review_count' => 340, 'description' => 'Bus service connecting Cambodia and Vietnam', 'status' => 'active'],
            ['name' => 'Bintan Ferries', 'slug' => 'bintan-ferries', 'type' => 'ferry', 'country' => 'IDN', 'commission_rate' => 8.0, 'rating' => 4.1, 'review_count' => 560, 'description' => 'Ferry service between Singapore and Bintan', 'status' => 'active'],
        ];

        foreach ($providers as $provider) {
            Provider::create($provider);
        }
    }
}
