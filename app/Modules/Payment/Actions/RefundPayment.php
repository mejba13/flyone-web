<?php

namespace App\Modules\Payment\Actions;

use App\Modules\Payment\Models\Transaction;

class RefundPayment
{
    public function execute(Transaction $transaction, ?float $amount = null): Transaction
    {
        $refundAmount = $amount ?? $transaction->amount;
        $user = $transaction->user;

        $refund = $user->refund($transaction->gateway_ref, [
            'amount' => (int) ($refundAmount * 100),
        ]);

        $transaction->update([
            'status' => $refundAmount >= $transaction->amount ? 'refunded' : 'partially_refunded',
            'refund_amount' => $transaction->refund_amount + $refundAmount,
        ]);

        return $transaction;
    }
}
