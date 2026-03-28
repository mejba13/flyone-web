<?php

namespace App\Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\User\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirect(string $provider)
    {
        $this->validateProvider($provider);
        return Socialite::driver($provider)->redirect();
    }

    public function callback(string $provider)
    {
        $this->validateProvider($provider);
        $socialUser = Socialite::driver($provider)->user();

        $user = User::where("{$provider}_id", $socialUser->getId())->first();

        if (!$user) {
            $user = User::where('email', $socialUser->getEmail())->first();
            if ($user) {
                $user->update(["{$provider}_id" => $socialUser->getId()]);
            } else {
                $user = User::create([
                    'name' => $socialUser->getName(),
                    'email' => $socialUser->getEmail(),
                    'avatar' => $socialUser->getAvatar(),
                    "{$provider}_id" => $socialUser->getId(),
                    'email_verified_at' => now(),
                    'password' => null,
                ]);
                $user->assignRole('user');
            }
        }

        Auth::login($user, true);
        return redirect('/dashboard');
    }

    private function validateProvider(string $provider): void
    {
        if (!in_array($provider, ['google', 'apple', 'facebook'])) {
            abort(404);
        }
    }
}
