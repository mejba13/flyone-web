<?php

namespace App\Modules\Search\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Route extends Model
{
    use HasFactory, Searchable;

    protected $fillable = [
        'provider_id', 'route_number', 'origin_code', 'origin_name',
        'destination_code', 'destination_name', 'departure_at', 'arrival_at',
        'duration_minutes', 'mode', 'class', 'base_price', 'currency',
        'available_seats', 'total_seats', 'stops', 'amenities', 'stop_details', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'departure_at' => 'datetime',
            'arrival_at' => 'datetime',
            'base_price' => 'decimal:2',
            'available_seats' => 'integer',
            'total_seats' => 'integer',
            'stops' => 'integer',
            'amenities' => 'array',
            'stop_details' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function provider()
    {
        return $this->belongsTo(\App\Modules\Provider\Models\Provider::class);
    }

    public function bookingSegments()
    {
        return $this->hasMany(\App\Modules\Booking\Models\BookingSegment::class);
    }

    public function reviews()
    {
        return $this->hasMany(\App\Modules\Provider\Models\Review::class);
    }

    public function scopeAvailable($query)
    {
        return $query->where('is_active', true)->where('available_seats', '>', 0);
    }

    public function scopeByRoute($query, string $origin, string $destination)
    {
        return $query->where('origin_code', $origin)->where('destination_code', $destination);
    }

    public function scopeByDate($query, string $date)
    {
        return $query->whereDate('departure_at', $date);
    }

    public function scopeByMode($query, string $mode)
    {
        return $query->where('mode', $mode);
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'origin_code' => $this->origin_code,
            'origin_name' => $this->origin_name,
            'destination_code' => $this->destination_code,
            'destination_name' => $this->destination_name,
            'mode' => $this->mode,
            'base_price' => (float) $this->base_price,
        ];
    }
}
