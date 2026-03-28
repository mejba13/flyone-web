<?php

namespace App\Modules\Booking\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingSegment extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id', 'route_id', 'segment_order', 'origin_code', 'origin_name',
        'destination_code', 'destination_name', 'departure_at', 'arrival_at',
        'carrier_name', 'carrier_logo', 'vehicle_number', 'class', 'status',
    ];

    protected function casts(): array
    {
        return [
            'departure_at' => 'datetime',
            'arrival_at' => 'datetime',
            'segment_order' => 'integer',
        ];
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function route()
    {
        return $this->belongsTo(\App\Modules\Search\Models\Route::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
}
