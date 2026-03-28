<?php

namespace App\Modules\User\Actions;

use App\Modules\User\Models\Traveler;
use App\Modules\User\Models\User;

class ManageTravelers
{
    public function store(User $user, array $data): Traveler
    {
        return $user->travelers()->create($data);
    }

    public function update(Traveler $traveler, array $data): Traveler
    {
        $traveler->update($data);
        return $traveler->fresh();
    }

    public function delete(Traveler $traveler): void
    {
        $traveler->delete();
    }
}
