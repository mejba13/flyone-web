<?php

namespace App\Modules\Booking\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Booking\Actions\CreateBooking;
use App\Modules\Booking\Actions\ConfirmBooking;
use App\Modules\Booking\Actions\CancelBooking;
use App\Modules\Booking\Models\Booking;
use App\Modules\Search\Models\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function passengers(Request $request)
    {
        $route = Route::with('provider')->findOrFail($request->get('route_id'));
        $travelers = $request->user()->travelers;

        return Inertia::render('Booking/Passengers', [
            'route' => $route,
            'savedTravelers' => $travelers,
        ]);
    }

    public function seats(Request $request)
    {
        $route = Route::with('provider')->findOrFail($request->get('route_id'));

        return Inertia::render('Booking/SeatSelection', [
            'route' => $route,
            'totalSeats' => $route->total_seats,
            'availableSeats' => $route->available_seats,
        ]);
    }

    public function addons(Request $request)
    {
        $route = Route::with('provider')->findOrFail($request->get('route_id'));

        return Inertia::render('Booking/Addons', [
            'route' => $route,
        ]);
    }

    public function review(Request $request)
    {
        $route = Route::with('provider')->findOrFail($request->get('route_id'));

        return Inertia::render('Booking/Review', [
            'route' => $route,
            'bookingData' => $request->session()->get('booking_data', []),
        ]);
    }

    public function payment(Request $request)
    {
        $route = Route::with('provider')->findOrFail($request->get('route_id'));

        return Inertia::render('Booking/Payment', [
            'route' => $route,
            'stripeKey' => config('cashier.key'),
        ]);
    }

    public function store(Request $request, CreateBooking $createBooking)
    {
        $validated = $request->validate([
            'route_id' => 'required|exists:routes,id',
            'return_route_id' => 'nullable|exists:routes,id',
            'passenger_count' => 'required|integer|min:1|max:9',
            'contact_email' => 'required|email',
            'contact_phone' => 'nullable|string',
            'special_requests' => 'nullable|string|max:500',
            'promo_code_id' => 'nullable|exists:promo_codes,id',
            'discount_amount' => 'nullable|numeric|min:0',
        ]);

        $validated['user_id'] = $request->user()->id;

        $booking = $createBooking->execute($validated);

        return redirect()->route('booking.confirmation', $booking->booking_ref)
            ->with('success', 'Booking created successfully!');
    }

    public function confirmation(string $bookingRef)
    {
        $booking = Booking::with(['segments.route.provider', 'tickets.traveler', 'user'])
            ->where('booking_ref', $bookingRef)
            ->firstOrFail();

        return Inertia::render('Booking/Confirmation', [
            'booking' => $booking,
        ]);
    }

    public function cancel(Request $request, Booking $booking, CancelBooking $cancelBooking)
    {
        $this->authorize('update', $booking);

        $cancelBooking->execute($booking, $request->get('reason', ''));

        return back()->with('success', 'Booking cancelled successfully.');
    }
}
