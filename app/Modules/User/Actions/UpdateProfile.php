<?php

namespace App\Modules\User\Actions;

use App\Modules\User\Models\User;

class UpdateProfile
{
    public function execute(User $user, array $data): User
    {
        $user->update(array_filter([
            'name' => $data['name'] ?? null,
            'email' => $data['email'] ?? null,
            'phone' => $data['phone'] ?? null,
            'avatar' => $data['avatar'] ?? null,
            'preferences' => $data['preferences'] ?? null,
        ]));

        return $user->fresh();
    }
}
