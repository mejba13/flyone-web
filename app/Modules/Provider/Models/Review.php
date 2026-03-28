<?php

namespace App\Modules\Provider\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id', 'provider_id', 'route_id', 'booking_id',
        'rating', 'title', 'body', 'is_verified', 'ratings_breakdown',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'is_verified' => 'boolean',
            'ratings_breakdown' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(\App\Modules\User\Models\User::class);
    }

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }

    public function route()
    {
        return $this->belongsTo(\App\Modules\Search\Models\Route::class);
    }

    public function booking()
    {
        return $this->belongsTo(\App\Modules\Booking\Models\Booking::class);
    }
}
