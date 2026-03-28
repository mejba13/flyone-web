<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            ProviderSeeder::class,
            DestinationSeeder::class,
            UserSeeder::class,
            RouteSeeder::class,
            PromoCodeSeeder::class,
            BookingSeeder::class,
            BlogPostSeeder::class,
        ]);
    }
}
