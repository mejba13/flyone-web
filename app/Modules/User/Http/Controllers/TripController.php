<?php

namespace App\Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TripController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $upcoming = $user->bookings()
            ->with(['segments.route.provider', 'tickets'])
            ->upcoming()
            ->latest('booked_at')
            ->get();

        $past = $user->bookings()
            ->with(['segments.route.provider', 'tickets'])
            ->past()
            ->latest('booked_at')
            ->paginate(10);

        return Inertia::render('Dashboard/Trips', [
            'upcoming' => $upcoming,
            'past' => $past,
        ]);
    }
}
