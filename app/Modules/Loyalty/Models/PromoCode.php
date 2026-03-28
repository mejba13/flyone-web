<?php

namespace App\Modules\Loyalty\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromoCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'name', 'description', 'type', 'value', 'min_order',
        'max_discount', 'usage_limit', 'usage_count', 'per_user_limit',
        'valid_from', 'valid_until', 'is_active', 'conditions',
    ];

    protected function casts(): array
    {
        return [
            'value' => 'decimal:2',
            'min_order' => 'decimal:2',
            'max_discount' => 'decimal:2',
            'usage_limit' => 'integer',
            'usage_count' => 'integer',
            'per_user_limit' => 'integer',
            'valid_from' => 'datetime',
            'valid_until' => 'datetime',
            'is_active' => 'boolean',
            'conditions' => 'array',
        ];
    }

    public function bookings()
    {
        return $this->hasMany(\App\Modules\Booking\Models\Booking::class);
    }

    public function isValid(): bool
    {
        return $this->is_active
            && $this->valid_from->isPast()
            && $this->valid_until->isFuture()
            && ($this->usage_limit === null || $this->usage_count < $this->usage_limit);
    }

    public function calculateDiscount(float $amount): float
    {
        $discount = $this->type === 'percentage'
            ? $amount * ($this->value / 100)
            : $this->value;

        if ($this->max_discount) {
            $discount = min($discount, (float) $this->max_discount);
        }

        return round($discount, 2);
    }

    public function scopeValid($query)
    {
        return $query->where('is_active', true)
            ->where('valid_from', '<=', now())
            ->where('valid_until', '>=', now());
    }
}
