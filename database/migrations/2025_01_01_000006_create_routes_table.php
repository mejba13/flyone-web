<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('routes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_id')->constrained()->cascadeOnDelete();
            $table->string('route_number')->nullable();
            $table->string('origin_code', 10);
            $table->string('origin_name');
            $table->string('destination_code', 10);
            $table->string('destination_name');
            $table->timestamp('departure_at');
            $table->timestamp('arrival_at');
            $table->integer('duration_minutes');
            $table->enum('mode', ['flight', 'train', 'bus', 'ferry']);
            $table->enum('class', ['economy', 'premium_economy', 'business', 'first']);
            $table->decimal('base_price', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->integer('available_seats');
            $table->integer('total_seats');
            $table->integer('stops')->default(0);
            $table->jsonb('amenities')->nullable();
            $table->jsonb('stop_details')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['origin_code', 'destination_code', 'departure_at']);
            $table->index(['mode', 'departure_at']);
            $table->index(['provider_id', 'is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('routes');
    }
};
