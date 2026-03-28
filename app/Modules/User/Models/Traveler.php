<?php

namespace App\Modules\User\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Traveler extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'full_name', 'date_of_birth', 'nationality',
        'passport_number', 'passport_expiry', 'gender', 'phone',
        'email', 'is_primary',
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'passport_expiry' => 'date',
            'is_primary' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tickets()
    {
        return $this->hasMany(\App\Modules\Booking\Models\Ticket::class);
    }

    public function isPassportValid(): bool
    {
        return $this->passport_expiry && $this->passport_expiry->isFuture();
    }
}
