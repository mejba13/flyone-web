<?php

namespace App\Modules\Search\Actions;

use App\Modules\Search\Models\Destination;
use Illuminate\Support\Facades\Cache;

class GetDestination
{
    public function execute(string $slug): ?Destination
    {
        return Cache::remember("destination:{$slug}", 86400, function () use ($slug) {
            return Destination::where('slug', $slug)->first();
        });
    }
}
