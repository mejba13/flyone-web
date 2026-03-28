<?php

namespace App\Modules\Payment\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Booking\Actions\ConfirmBooking;
use App\Modules\Booking\Models\Booking;
use App\Modules\Loyalty\Actions\AwardPoints;
use App\Modules\Payment\Actions\ProcessPayment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function process(Request $request, ProcessPayment $processPayment, ConfirmBooking $confirmBooking, AwardPoints $awardPoints)
    {
        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'payment_method_id' => 'required|string',
            'travelers' => 'required|array|min:1',
            'travelers.*.id' => 'required|exists:travelers,id',
            'travelers.*.seat' => 'nullable|string',
            'travelers.*.baggage' => 'nullable|array',
            'travelers.*.meal' => 'nullable|array',
        ]);

        $booking = Booking::findOrFail($validated['booking_id']);
        $transaction = $processPayment->execute($booking, $validated['payment_method_id']);

        if ($transaction->status === 'completed') {
            $confirmedBooking = $confirmBooking->execute($booking, $validated['travelers']);

            $points = (int) ($booking->total_amount * 10);
            $awardPoints->execute($booking->user, $points, 'booking', "Booking {$booking->booking_ref}", 'booking', $booking->id);

            return redirect()->route('booking.confirmation', $booking->booking_ref)
                ->with('success', 'Payment successful! Your booking is confirmed.');
        }

        return back()->with('error', 'Payment failed. Please try again.');
    }

    public function setupIntent(Request $request)
    {
        return response()->json([
            'client_secret' => $request->user()->createSetupIntent()->client_secret,
        ]);
    }
}
