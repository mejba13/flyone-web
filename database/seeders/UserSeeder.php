<?php

namespace Database\Seeders;

use App\Modules\User\Models\User;
use App\Modules\User\Models\Traveler;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@flyone.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'tier' => 'platinum',
            'points_balance' => 75000,
        ]);
        $admin->assignRole('super_admin');

        // Provider user
        $provider = User::create([
            'name' => 'AirAsia Manager',
            'email' => 'provider@flyone.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'tier' => 'gold',
            'points_balance' => 25000,
        ]);
        $provider->assignRole('provider');

        // Demo user
        $demo = User::create([
            'name' => 'Jane Traveler',
            'email' => 'demo@flyone.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'tier' => 'silver',
            'points_balance' => 8500,
            'preferences' => ['currency' => 'USD', 'language' => 'en', 'notifications' => true],
        ]);
        $demo->assignRole('user');

        Traveler::create([
            'user_id' => $demo->id,
            'full_name' => 'Jane Traveler',
            'date_of_birth' => '1992-05-15',
            'nationality' => 'USA',
            'passport_number' => 'US12345678',
            'passport_expiry' => '2028-05-15',
            'gender' => 'female',
            'is_primary' => true,
        ]);

        Traveler::create([
            'user_id' => $demo->id,
            'full_name' => 'John Traveler',
            'date_of_birth' => '1990-08-22',
            'nationality' => 'USA',
            'passport_number' => 'US87654321',
            'passport_expiry' => '2027-08-22',
            'gender' => 'male',
            'is_primary' => false,
        ]);

        // Generate additional users
        $firstNames = ['Liam', 'Emma', 'Noah', 'Olivia', 'Ethan', 'Ava', 'Mason', 'Sophia', 'Lucas', 'Mia', 'Oliver', 'Isabella', 'Aiden', 'Charlotte', 'Elijah', 'Amelia', 'James', 'Harper', 'Benjamin', 'Evelyn', 'Jack', 'Abigail', 'Henry', 'Emily', 'Alexander', 'Ella', 'Sebastian', 'Elizabeth', 'Michael', 'Sofia', 'Daniel', 'Avery', 'Matthew', 'Scarlett', 'Samuel', 'Grace', 'David', 'Lily', 'Joseph', 'Chloe', 'Carter', 'Victoria', 'Owen', 'Riley', 'Wyatt', 'Aria', 'John'];
        $lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell'];
        $tiers = ['bronze', 'bronze', 'bronze', 'silver', 'silver', 'gold'];

        for ($i = 0; $i < 47; $i++) {
            $firstName = $firstNames[$i % count($firstNames)];
            $lastName = $lastNames[$i % count($lastNames)];
            $user = User::create([
                'name' => "$firstName $lastName",
                'email' => strtolower($firstName) . '.' . strtolower($lastName) . ($i > 0 ? $i : '') . '@example.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now()->subDays(rand(1, 365)),
                'tier' => $tiers[array_rand($tiers)],
                'points_balance' => rand(0, 15000),
            ]);
            $user->assignRole('user');
        }
    }
}
