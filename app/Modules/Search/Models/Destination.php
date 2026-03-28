<?php

namespace App\Modules\Search\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Destination extends Model
{
    use HasFactory, Searchable;

    protected $fillable = [
        'name', 'slug', 'code', 'country', 'country_code', 'timezone',
        'latitude', 'longitude', 'image_url', 'description', 'weather',
        'highlights', 'travel_tips', 'avg_price', 'is_popular', 'is_featured',
    ];

    protected function casts(): array
    {
        return [
            'weather' => 'array',
            'highlights' => 'array',
            'travel_tips' => 'array',
            'avg_price' => 'decimal:2',
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
            'is_popular' => 'boolean',
            'is_featured' => 'boolean',
        ];
    }

    public function scopePopular($query)
    {
        return $query->where('is_popular', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'country' => $this->country,
            'code' => $this->code,
        ];
    }
}
