<?php

namespace App\Modules\Admin\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Booking\Models\Booking;
use App\Modules\Payment\Models\Transaction;
use App\Modules\User\Models\User;
use App\Modules\Provider\Models\Provider;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_users' => User::count(),
                'total_bookings' => Booking::count(),
                'total_revenue' => Transaction::completed()->sum('amount'),
                'active_providers' => Provider::active()->count(),
                'recent_bookings' => Booking::with(['user', 'segments'])
                    ->latest()
                    ->limit(10)
                    ->get(),
            ],
        ]);
    }
}
