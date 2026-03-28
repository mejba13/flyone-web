<?php

namespace App\Modules\Provider\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Search\Models\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProviderDashboardController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Provider/Dashboard', [
            'stats' => [
                'total_routes' => Route::count(),
                'active_routes' => Route::where('is_active', true)->count(),
                'total_bookings' => 0,
                'revenue' => 0,
            ],
        ]);
    }
}
