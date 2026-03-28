<?php

namespace App\Modules\Loyalty\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Loyalty\Actions\ApplyPromoCode;
use App\Modules\Loyalty\Models\LoyaltyPoint;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoyaltyController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $history = LoyaltyPoint::where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->paginate(20);

        $tierProgress = $this->getTierProgress($user);

        return Inertia::render('Dashboard/Loyalty', [
            'points' => $user->points_balance,
            'tier' => $user->tier,
            'tierProgress' => $tierProgress,
            'history' => $history,
        ]);
    }

    public function applyPromo(Request $request, ApplyPromoCode $applyPromoCode)
    {
        $request->validate(['code' => 'required|string', 'amount' => 'required|numeric|min:0']);

        $result = $applyPromoCode->execute($request->code, $request->amount);

        return response()->json($result);
    }

    private function getTierProgress($user): array
    {
        $tiers = ['bronze' => 0, 'silver' => 5000, 'gold' => 20000, 'platinum' => 50000];
        $current = $tiers[$user->tier] ?? 0;
        $tierKeys = array_keys($tiers);
        $currentIndex = array_search($user->tier, $tierKeys);
        $nextTier = $tierKeys[$currentIndex + 1] ?? null;
        $nextThreshold = $nextTier ? $tiers[$nextTier] : null;

        return [
            'current_tier' => $user->tier,
            'next_tier' => $nextTier,
            'points_needed' => $nextThreshold ? max(0, $nextThreshold - $user->points_balance) : 0,
            'progress_percent' => $nextThreshold
                ? min(100, round(($user->points_balance - $current) / ($nextThreshold - $current) * 100))
                : 100,
        ];
    }
}
