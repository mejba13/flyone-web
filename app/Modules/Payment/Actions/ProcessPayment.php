<?php

namespace App\Modules\Payment\Actions;

use App\Modules\Booking\Models\Booking;
use App\Modules\Payment\Models\Transaction;
use Laravel\Cashier\Exceptions\IncompletePayment;

class ProcessPayment
{
    public function execute(Booking $booking, string $paymentMethodId): Transaction
    {
        $transaction = Transaction::create([
            'booking_id' => $booking->id,
            'user_id' => $booking->user_id,
            'amount' => $booking->total_amount,
            'currency' => $booking->currency,
            'method' => 'card',
            'gateway' => 'stripe',
            'status' => 'processing',
        ]);

        try {
            $user = $booking->user;
            $payment = $user->charge(
                (int) ($booking->total_amount * 100),
                $paymentMethodId,
                ['metadata' => ['booking_ref' => $booking->booking_ref]]
            );

            $transaction->update([
                'status' => 'completed',
                'gateway_ref' => $payment->id,
                'gateway_status' => $payment->status,
                'completed_at' => now(),
            ]);
        } catch (IncompletePayment $e) {
            $transaction->update([
                'status' => 'pending',
                'gateway_ref' => $e->payment->id,
                'gateway_status' => $e->payment->status,
            ]);
        } catch (\Exception $e) {
            $transaction->update([
                'status' => 'failed',
                'metadata' => ['error' => $e->getMessage()],
            ]);
        }

        return $transaction;
    }
}
