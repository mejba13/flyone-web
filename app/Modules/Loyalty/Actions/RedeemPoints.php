<?php

namespace App\Modules\Loyalty\Actions;

use App\Modules\Loyalty\Models\LoyaltyPoint;
use App\Modules\User\Models\User;

class RedeemPoints
{
    public function execute(User $user, int $points, string $description = ''): LoyaltyPoint
    {
        if ($user->points_balance < $points) {
            throw new \InvalidArgumentException('Insufficient points balance.');
        }

        $loyaltyPoint = LoyaltyPoint::create([
            'user_id' => $user->id,
            'points' => -$points,
            'type' => 'redeemed',
            'source' => 'redemption',
            'description' => $description,
        ]);

        $user->decrement('points_balance', $points);

        return $loyaltyPoint;
    }
}
