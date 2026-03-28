<?php

namespace App\Modules\Provider\Services;

use App\Modules\Provider\Models\Provider;

class ProviderGateway
{
    private array $adapters = [];

    public function registerAdapter(string $type, ProviderAdapterInterface $adapter): void
    {
        $this->adapters[$type] = $adapter;
    }

    public function searchRoutes(Provider $provider, array $params): array
    {
        $adapter = $this->getAdapter($provider->type);
        return $adapter->searchRoutes($provider, $params);
    }

    public function getAvailability(Provider $provider, string $routeId): array
    {
        $adapter = $this->getAdapter($provider->type);
        return $adapter->getAvailability($provider, $routeId);
    }

    public function createReservation(Provider $provider, array $bookingData): array
    {
        $adapter = $this->getAdapter($provider->type);
        return $adapter->createReservation($provider, $bookingData);
    }

    private function getAdapter(string $type): ProviderAdapterInterface
    {
        if (!isset($this->adapters[$type])) {
            throw new \RuntimeException("No adapter registered for provider type: {$type}");
        }
        return $this->adapters[$type];
    }
}
