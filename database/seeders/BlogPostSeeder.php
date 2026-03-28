<?php

namespace Database\Seeders;

use App\Modules\Admin\Models\BlogPost;
use App\Modules\User\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::role('super_admin')->first();

        $posts = [
            ['title' => '10 Hidden Gems in Southeast Asia You Must Visit', 'category' => 'Destinations', 'excerpt' => 'Discover the lesser-known paradises that most travelers overlook in Southeast Asia.', 'content' => '<p>Southeast Asia is home to some of the world\'s most beautiful destinations. While places like Bali and Bangkok are well-known, there are countless hidden gems waiting to be discovered.</p><h2>1. Koh Rong, Cambodia</h2><p>This island paradise offers pristine beaches and bioluminescent plankton at night.</p><h2>2. Luang Prabang, Laos</h2><p>A UNESCO World Heritage city with stunning temples and the famous monks\' alms procession.</p><h2>3. Ninh Binh, Vietnam</h2><p>Often called "Ha Long Bay on land," this area features dramatic karst landscapes.</p><p>These destinations offer authentic experiences without the crowds of more popular spots.</p>', 'tags' => ['Southeast Asia', 'Hidden Gems', 'Travel Tips']],
            ['title' => 'The Ultimate Packing Guide for Tropical Destinations', 'category' => 'Travel Tips', 'excerpt' => 'Everything you need to pack for a comfortable and stylish tropical vacation.', 'content' => '<p>Packing for tropical destinations requires a balance of comfort, style, and practicality.</p><h2>Essentials</h2><ul><li>Lightweight, breathable clothing</li><li>Reef-safe sunscreen</li><li>Insect repellent</li><li>Water bottle</li></ul><h2>Footwear</h2><p>Pack comfortable walking shoes, waterproof sandals, and flip-flops for the beach.</p><p>Remember: less is more when traveling in tropical climates!</p>', 'tags' => ['Packing', 'Travel Tips', 'Tropical']],
            ['title' => 'How to Find Cheap Flights: A Complete Guide', 'category' => 'Budget Travel', 'excerpt' => 'Expert tips and tricks for scoring the best deals on flights.', 'content' => '<p>Finding affordable flights doesn\'t have to be difficult. Here are proven strategies.</p><h2>Book in Advance</h2><p>For international flights, booking 2-3 months ahead typically yields the best prices.</p><h2>Be Flexible</h2><p>Flying on weekdays, especially Tuesdays and Wednesdays, can save you 20-30%.</p><h2>Use Price Alerts</h2><p>Set up alerts on Flyone to get notified when prices drop for your preferred routes.</p>', 'tags' => ['Budget', 'Flights', 'Tips']],
            ['title' => 'Street Food Tour: Bangkok\'s Best Bites', 'category' => 'Food & Culture', 'excerpt' => 'A guide to the must-try street food dishes in Thailand\'s capital.', 'content' => '<p>Bangkok\'s street food scene is legendary, and for good reason.</p><h2>Must-Try Dishes</h2><ul><li><strong>Pad Thai</strong> - The classic stir-fried noodle dish</li><li><strong>Som Tum</strong> - Spicy green papaya salad</li><li><strong>Mango Sticky Rice</strong> - The perfect dessert</li><li><strong>Tom Yum Goong</strong> - Spicy shrimp soup</li></ul><p>Head to Yaowarat (Chinatown) or Khao San Road for the best street food experience.</p>', 'tags' => ['Food', 'Bangkok', 'Street Food']],
            ['title' => 'Digital Nomad Guide to Chiang Mai', 'category' => 'Digital Nomad', 'excerpt' => 'Why Chiang Mai is the perfect base for remote workers and digital nomads.', 'content' => '<p>Chiang Mai has become one of the world\'s top digital nomad destinations.</p><h2>Why Chiang Mai?</h2><ul><li>Low cost of living ($800-1200/month)</li><li>Fast internet and co-working spaces</li><li>Amazing food and culture</li><li>Friendly community</li></ul><h2>Best Areas to Live</h2><p>Nimman is the hipster neighborhood, while the Old City offers traditional charm.</p>', 'tags' => ['Digital Nomad', 'Remote Work', 'Chiang Mai']],
        ];

        foreach ($posts as $post) {
            BlogPost::create([
                'author_id' => $admin->id,
                'title' => $post['title'],
                'slug' => Str::slug($post['title']),
                'excerpt' => $post['excerpt'],
                'content' => $post['content'],
                'category' => $post['category'],
                'tags' => $post['tags'],
                'status' => 'published',
                'published_at' => now()->subDays(rand(1, 60)),
                'view_count' => rand(50, 5000),
            ]);
        }
    }
}
