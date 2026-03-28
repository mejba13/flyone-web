<?php

namespace App\Modules\Search\Actions;

use App\Modules\Search\Models\Route;
use Illuminate\Support\Facades\Cache;

class SearchRoutes
{
    public function execute(array $filters): \Illuminate\Pagination\LengthAwarePaginator
    {
        $cacheKey = 'search:' . md5(json_encode($filters));

        return Cache::remember($cacheKey, 300, function () use ($filters) {
            $query = Route::with('provider')
                ->available()
                ->byRoute($filters['origin'], $filters['destination']);

            if (!empty($filters['date'])) {
                $query->byDate($filters['date']);
            }

            if (!empty($filters['mode'])) {
                $query->byMode($filters['mode']);
            }

            if (!empty($filters['class'])) {
                $query->where('class', $filters['class']);
            }

            if (!empty($filters['min_price'])) {
                $query->where('base_price', '>=', $filters['min_price']);
            }

            if (!empty($filters['max_price'])) {
                $query->where('base_price', '<=', $filters['max_price']);
            }

            if (!empty($filters['max_stops'])) {
                $query->where('stops', '<=', $filters['max_stops']);
            }

            if (!empty($filters['providers'])) {
                $query->whereIn('provider_id', $filters['providers']);
            }

            $sortField = $filters['sort'] ?? 'base_price';
            $sortDir = $filters['sort_dir'] ?? 'asc';
            $query->orderBy($sortField, $sortDir);

            return $query->paginate($filters['per_page'] ?? 20);
        });
    }
}
