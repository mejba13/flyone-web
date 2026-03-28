<?php

namespace App\Modules\Provider\Services;

use App\Modules\Provider\Models\Provider;

interface ProviderAdapterInterface
{
    public function searchRoutes(Provider $provider, array $params): array;
    public function getAvailability(Provider $provider, string $routeId): array;
    public function createReservation(Provider $provider, array $bookingData): array;
    public function cancelReservation(Provider $provider, string $reservationId): bool;
}
