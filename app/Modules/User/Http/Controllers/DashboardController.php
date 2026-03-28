<?php

namespace App\Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $upcomingTrips = $user->bookings()
            ->with('segments')
            ->upcoming()
            ->latest('booked_at')
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard/Index', [
            'upcomingTrips' => $upcomingTrips,
            'stats' => [
                'total_bookings' => $user->bookings()->count(),
                'points_balance' => $user->points_balance,
                'tier' => $user->tier,
                'upcoming_count' => $upcomingTrips->count(),
            ],
        ]);
    }
}
