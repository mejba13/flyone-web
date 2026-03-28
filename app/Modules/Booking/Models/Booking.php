<?php

namespace App\Modules\Booking\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Booking extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id', 'booking_ref', 'status', 'subtotal', 'tax_amount',
        'discount_amount', 'total_amount', 'currency', 'promo_code_id',
        'booked_at', 'expires_at', 'metadata', 'special_requests',
        'contact_email', 'contact_phone',
    ];

    protected function casts(): array
    {
        return [
            'subtotal' => 'decimal:2',
            'tax_amount' => 'decimal:2',
            'discount_amount' => 'decimal:2',
            'total_amount' => 'decimal:2',
            'booked_at' => 'datetime',
            'expires_at' => 'datetime',
            'metadata' => 'array',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Booking $booking) {
            if (empty($booking->booking_ref)) {
                $booking->booking_ref = strtoupper(Str::random(8));
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(\App\Modules\User\Models\User::class);
    }

    public function segments()
    {
        return $this->hasMany(BookingSegment::class)->orderBy('segment_order');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function transactions()
    {
        return $this->hasMany(\App\Modules\Payment\Models\Transaction::class);
    }

    public function promoCode()
    {
        return $this->belongsTo(\App\Modules\Loyalty\Models\PromoCode::class);
    }

    public function review()
    {
        return $this->hasOne(\App\Modules\Provider\Models\Review::class);
    }

    public function scopeUpcoming($query)
    {
        return $query->where('status', 'confirmed')
            ->whereHas('segments', fn ($q) => $q->where('departure_at', '>', now()));
    }

    public function scopePast($query)
    {
        return $query->whereIn('status', ['completed', 'cancelled'])
            ->orWhere(function ($q) {
                $q->where('status', 'confirmed')
                    ->whereDoesntHave('segments', fn ($sq) => $sq->where('arrival_at', '>', now()));
            });
    }

    public function isModifiable(): bool
    {
        return in_array($this->status, ['pending', 'confirmed']);
    }

    public function isCancellable(): bool
    {
        return in_array($this->status, ['pending', 'confirmed']);
    }
}
