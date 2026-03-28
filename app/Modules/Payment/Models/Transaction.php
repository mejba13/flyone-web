<?php

namespace App\Modules\Payment\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id', 'user_id', 'amount', 'currency', 'method',
        'gateway', 'gateway_ref', 'gateway_status', 'status',
        'refund_amount', 'refund_reason', 'metadata', 'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'refund_amount' => 'decimal:2',
            'metadata' => 'array',
            'completed_at' => 'datetime',
        ];
    }

    public function booking()
    {
        return $this->belongsTo(\App\Modules\Booking\Models\Booking::class);
    }

    public function user()
    {
        return $this->belongsTo(\App\Modules\User\Models\User::class);
    }

    public function isRefundable(): bool
    {
        return $this->status === 'completed' && $this->refund_amount < $this->amount;
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }
}
