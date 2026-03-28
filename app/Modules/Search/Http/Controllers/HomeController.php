<?php

namespace App\Modules\Search\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Search\Services\SearchService;
use App\Modules\Search\Models\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{
    public function __construct(private SearchService $searchService) {}

    public function __invoke()
    {
        $trending = $this->searchService->getTrendingDestinations();
        $featured = $this->searchService->getFeaturedDestinations();

        $flashDeals = Cache::remember('flash_deals', 300, function () {
            return Route::with('provider')
                ->available()
                ->where('departure_at', '>', now())
                ->where('departure_at', '<', now()->addDays(30))
                ->orderBy('base_price')
                ->limit(6)
                ->get()
                ->toArray();
        });

        return Inertia::render('Public/Landing', [
            'trending' => $trending,
            'featured' => $featured,
            'flashDeals' => $flashDeals,
            'stats' => [
                'routes' => Route::count(),
                'destinations' => \App\Modules\Search\Models\Destination::count(),
                'bookings' => \App\Modules\Booking\Models\Booking::count(),
                'users' => \App\Modules\User\Models\User::count(),
            ],
        ]);
    }
}
