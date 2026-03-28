<?php

namespace App\Modules\Search\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Search\Actions\GetDestination;
use App\Modules\Search\Models\Destination;
use Inertia\Inertia;

class DestinationController extends Controller
{
    public function index()
    {
        $destinations = Destination::orderBy('name')->paginate(20);

        return Inertia::render('Public/Destinations', [
            'destinations' => $destinations,
        ]);
    }

    public function show(string $slug, GetDestination $getDestination)
    {
        $destination = $getDestination->execute($slug);

        if (!$destination) {
            abort(404);
        }

        return Inertia::render('Public/DestinationShow', [
            'destination' => $destination,
        ]);
    }
}
