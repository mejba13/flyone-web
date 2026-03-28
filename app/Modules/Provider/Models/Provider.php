<?php

namespace App\Modules\Provider\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;

class Provider extends Model
{
    use HasFactory, SoftDeletes, Searchable;

    protected $fillable = [
        'name', 'slug', 'type', 'logo_url', 'website', 'api_config',
        'commission_rate', 'status', 'country', 'description', 'rating', 'review_count',
    ];

    protected function casts(): array
    {
        return [
            'api_config' => 'array',
            'commission_rate' => 'decimal:2',
            'rating' => 'decimal:2',
            'review_count' => 'integer',
        ];
    }

    public function routes()
    {
        return $this->hasMany(\App\Modules\Search\Models\Route::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'country' => $this->country,
        ];
    }
}
