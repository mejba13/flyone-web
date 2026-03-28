<?php

namespace App\Modules\Search\Services;

use App\Modules\Search\Actions\SearchRoutes;
use App\Modules\Search\Actions\AutocompleteDestinations;
use App\Modules\Search\Models\Destination;
use Illuminate\Support\Facades\Cache;

class SearchService
{
    public function __construct(
        private SearchRoutes $searchRoutes,
        private AutocompleteDestinations $autocomplete,
    ) {}

    public function search(array $filters)
    {
        return $this->searchRoutes->execute($filters);
    }

    public function autocomplete(string $query): array
    {
        return $this->autocomplete->execute($query);
    }

    public function getTrendingDestinations(int $limit = 8): array
    {
        return Cache::remember('trending_destinations', 3600, function () use ($limit) {
            return Destination::popular()
                ->limit($limit)
                ->get()
                ->toArray();
        });
    }

    public function getFeaturedDestinations(int $limit = 4): array
    {
        return Cache::remember('featured_destinations', 3600, function () use ($limit) {
            return Destination::featured()
                ->limit($limit)
                ->get()
                ->toArray();
        });
    }
}
