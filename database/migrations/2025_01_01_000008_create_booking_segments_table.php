<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('booking_segments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained()->cascadeOnDelete();
            $table->foreignId('route_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('segment_order');
            $table->string('origin_code', 10);
            $table->string('origin_name');
            $table->string('destination_code', 10);
            $table->string('destination_name');
            $table->timestamp('departure_at');
            $table->timestamp('arrival_at');
            $table->string('carrier_name')->nullable();
            $table->string('carrier_logo')->nullable();
            $table->string('vehicle_number')->nullable();
            $table->enum('class', ['economy', 'premium_economy', 'business', 'first']);
            $table->enum('status', ['scheduled', 'boarding', 'departed', 'arrived', 'cancelled'])->default('scheduled');
            $table->timestamps();

            $table->index(['booking_id', 'segment_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('booking_segments');
    }
};
