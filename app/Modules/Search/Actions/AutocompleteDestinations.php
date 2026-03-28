<?php

namespace App\Modules\Search\Actions;

use App\Modules\Search\Models\Destination;
use Illuminate\Support\Facades\Cache;

class AutocompleteDestinations
{
    public function execute(string $query): array
    {
        return Cache::remember("autocomplete:" . md5($query), 3600, function () use ($query) {
            return Destination::where('name', 'ilike', "%{$query}%")
                ->orWhere('code', 'ilike', "%{$query}%")
                ->orWhere('country', 'ilike', "%{$query}%")
                ->limit(10)
                ->get(['id', 'name', 'code', 'country', 'country_code'])
                ->toArray();
        });
    }
}
