<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained()->cascadeOnDelete();
            $table->foreignId('traveler_id')->constrained()->cascadeOnDelete();
            $table->foreignId('booking_segment_id')->nullable()->constrained()->nullOnDelete();
            $table->string('ticket_number')->unique();
            $table->text('qr_code_data')->nullable();
            $table->string('seat_number')->nullable();
            $table->string('gate')->nullable();
            $table->string('terminal')->nullable();
            $table->enum('status', ['issued', 'checked_in', 'boarded', 'completed', 'cancelled', 'refunded'])->default('issued');
            $table->jsonb('baggage')->nullable();
            $table->jsonb('meal_preference')->nullable();
            $table->jsonb('addons')->nullable();
            $table->timestamps();

            $table->index(['booking_id', 'traveler_id']);
            $table->index(['ticket_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
