<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('destinations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('code', 10)->unique();
            $table->string('country');
            $table->string('country_code', 3);
            $table->string('timezone')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('image_url')->nullable();
            $table->text('description')->nullable();
            $table->jsonb('weather')->nullable();
            $table->jsonb('highlights')->nullable();
            $table->jsonb('travel_tips')->nullable();
            $table->decimal('avg_price', 10, 2)->nullable();
            $table->boolean('is_popular')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();

            $table->index(['is_popular', 'is_featured']);
            $table->index(['country_code']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('destinations');
    }
};
