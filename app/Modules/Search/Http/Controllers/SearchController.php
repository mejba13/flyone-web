<?php

namespace App\Modules\Search\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Search\Services\SearchService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function __construct(private SearchService $searchService) {}

    public function index()
    {
        return Inertia::render('Public/Search');
    }

    public function results(Request $request)
    {
        $filters = $request->validate([
            'origin' => 'required|string|max:10',
            'destination' => 'required|string|max:10',
            'date' => 'nullable|date',
            'return_date' => 'nullable|date|after:date',
            'mode' => 'nullable|in:flight,train,bus,ferry',
            'class' => 'nullable|in:economy,premium_economy,business,first',
            'passengers' => 'nullable|integer|min:1|max:9',
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0',
            'max_stops' => 'nullable|integer|min:0',
            'providers' => 'nullable|array',
            'sort' => 'nullable|in:base_price,departure_at,duration_minutes,rating',
            'sort_dir' => 'nullable|in:asc,desc',
        ]);

        $routes = $this->searchService->search($filters);

        return Inertia::render('Public/SearchResults', [
            'routes' => $routes,
            'filters' => $filters,
        ]);
    }

    public function autocomplete(Request $request)
    {
        $query = $request->get('q', '');
        if (strlen($query) < 2) {
            return response()->json([]);
        }

        return response()->json(
            $this->searchService->autocomplete($query)
        );
    }
}
