<?php

namespace App\Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\User\Actions\UpdateProfile;
use App\Modules\User\Actions\ManageTravelers;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $travelers = $user->travelers;

        return Inertia::render('Dashboard/Profile', [
            'user' => $user,
            'travelers' => $travelers,
        ]);
    }

    public function update(Request $request, UpdateProfile $updateProfile)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $request->user()->id,
            'phone' => 'nullable|string|max:20',
            'preferences' => 'nullable|array',
        ]);

        $updateProfile->execute($request->user(), $validated);

        return back()->with('success', 'Profile updated successfully.');
    }

    public function storeTraveler(Request $request, ManageTravelers $manageTravelers)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'date_of_birth' => 'required|date|before:today',
            'nationality' => 'required|string|size:3',
            'passport_number' => 'nullable|string|max:20',
            'passport_expiry' => 'nullable|date|after:today',
            'gender' => 'nullable|in:male,female,other',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email',
        ]);

        $manageTravelers->store($request->user(), $validated);

        return back()->with('success', 'Traveler added successfully.');
    }

    public function updateTraveler(Request $request, int $travelerId, ManageTravelers $manageTravelers)
    {
        $traveler = $request->user()->travelers()->findOrFail($travelerId);
        $validated = $request->validate([
            'full_name' => 'sometimes|string|max:255',
            'date_of_birth' => 'sometimes|date|before:today',
            'nationality' => 'sometimes|string|size:3',
            'passport_number' => 'nullable|string|max:20',
            'passport_expiry' => 'nullable|date|after:today',
            'gender' => 'nullable|in:male,female,other',
        ]);

        $manageTravelers->update($traveler, $validated);

        return back()->with('success', 'Traveler updated successfully.');
    }

    public function destroyTraveler(Request $request, int $travelerId, ManageTravelers $manageTravelers)
    {
        $traveler = $request->user()->travelers()->findOrFail($travelerId);
        $manageTravelers->delete($traveler);

        return back()->with('success', 'Traveler removed.');
    }
}
