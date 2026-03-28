<?php

namespace App\Modules\Provider\Services;

use App\Modules\Provider\Models\Provider;

class MockProviderAdapter implements ProviderAdapterInterface
{
    public function searchRoutes(Provider $provider, array $params): array
    {
        return [
            'status' => 'success',
            'provider' => $provider->slug,
            'routes' => [],
        ];
    }

    public function getAvailability(Provider $provider, string $routeId): array
    {
        return [
            'status' => 'success',
            'available_seats' => rand(1, 50),
            'price' => rand(50, 500),
        ];
    }

    public function createReservation(Provider $provider, array $bookingData): array
    {
        return [
            'status' => 'success',
            'reservation_id' => 'MOCK-' . strtoupper(\Illuminate\Support\Str::random(8)),
            'expires_at' => now()->addMinutes(30)->toIso8601String(),
        ];
    }

    public function cancelReservation(Provider $provider, string $reservationId): bool
    {
        return true;
    }
}
