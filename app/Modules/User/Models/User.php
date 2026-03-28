<?php

namespace App\Modules\User\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, HasRoles, Billable, SoftDeletes;

    protected $fillable = [
        'name', 'email', 'phone', 'password', 'avatar', 'preferences',
        'tier', 'points_balance', 'google_id', 'apple_id', 'facebook_id',
        'two_factor_secret', 'two_factor_recovery_codes', 'two_factor_confirmed_at',
        'failed_login_attempts', 'locked_until',
    ];

    protected $hidden = [
        'password', 'remember_token', 'two_factor_secret', 'two_factor_recovery_codes',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'two_factor_confirmed_at' => 'datetime',
            'locked_until' => 'datetime',
            'password' => 'hashed',
            'preferences' => 'array',
            'points_balance' => 'integer',
            'failed_login_attempts' => 'integer',
        ];
    }

    public function travelers()
    {
        return $this->hasMany(Traveler::class);
    }

    public function bookings()
    {
        return $this->hasMany(\App\Modules\Booking\Models\Booking::class);
    }

    public function loyaltyPoints()
    {
        return $this->hasMany(\App\Modules\Loyalty\Models\LoyaltyPoint::class);
    }

    public function reviews()
    {
        return $this->hasMany(\App\Modules\Provider\Models\Review::class);
    }

    public function notifications()
    {
        return $this->hasMany(\App\Modules\User\Models\Notification::class);
    }

    public function chatConversations()
    {
        return $this->hasMany(\App\Modules\AI\Models\ChatConversation::class);
    }

    public function isLocked(): bool
    {
        return $this->locked_until && $this->locked_until->isFuture();
    }

    public function hasTwoFactor(): bool
    {
        return $this->two_factor_confirmed_at !== null;
    }
}
