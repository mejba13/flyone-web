<?php

namespace App\Modules\User\Actions;

use App\Modules\User\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class EnableTwoFactor
{
    public function generateSecret(User $user): string
    {
        $secret = Str::random(32);
        $user->update(['two_factor_secret' => encrypt($secret)]);
        return $secret;
    }

    public function confirm(User $user): Collection
    {
        $codes = Collection::times(8, fn () => Str::random(10));
        $user->update([
            'two_factor_confirmed_at' => now(),
            'two_factor_recovery_codes' => encrypt($codes->toJson()),
        ]);
        return $codes;
    }

    public function disable(User $user): void
    {
        $user->update([
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
            'two_factor_confirmed_at' => null,
        ]);
    }
}
