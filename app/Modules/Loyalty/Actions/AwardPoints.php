<?php

namespace App\Modules\Loyalty\Actions;

use App\Modules\Loyalty\Models\LoyaltyPoint;
use App\Modules\User\Models\User;

class AwardPoints
{
    public function execute(User $user, int $points, string $source, string $description = '', ?string $referenceType = null, ?int $referenceId = null): LoyaltyPoint
    {
        $loyaltyPoint = LoyaltyPoint::create([
            'user_id' => $user->id,
            'points' => $points,
            'type' => 'earned',
            'source' => $source,
            'description' => $description,
            'reference_type' => $referenceType,
            'reference_id' => $referenceId,
            'expires_at' => now()->addYear(),
        ]);

        $user->increment('points_balance', $points);

        $this->checkTierUpgrade($user);

        return $loyaltyPoint;
    }

    private function checkTierUpgrade(User $user): void
    {
        $balance = $user->points_balance;
        $newTier = match (true) {
            $balance >= 50000 => 'platinum',
            $balance >= 20000 => 'gold',
            $balance >= 5000 => 'silver',
            default => 'bronze',
        };

        if ($user->tier !== $newTier) {
            $user->update(['tier' => $newTier]);
        }
    }
}
