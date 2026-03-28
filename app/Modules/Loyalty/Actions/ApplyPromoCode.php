<?php

namespace App\Modules\Loyalty\Actions;

use App\Modules\Loyalty\Models\PromoCode;

class ApplyPromoCode
{
    public function execute(string $code, float $orderAmount): array
    {
        $promo = PromoCode::where('code', strtoupper($code))->first();

        if (!$promo) {
            return ['valid' => false, 'message' => 'Invalid promo code.'];
        }

        if (!$promo->isValid()) {
            return ['valid' => false, 'message' => 'This promo code has expired or reached its usage limit.'];
        }

        if ($orderAmount < (float) $promo->min_order) {
            return ['valid' => false, 'message' => "Minimum order amount is {$promo->min_order}."];
        }

        $discount = $promo->calculateDiscount($orderAmount);

        return [
            'valid' => true,
            'promo_code_id' => $promo->id,
            'discount' => $discount,
            'message' => "Promo code applied! You save \${$discount}.",
        ];
    }
}
