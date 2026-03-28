<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->enum('method', ['card', 'wallet', 'bank_transfer', 'bnpl'])->default('card');
            $table->string('gateway')->default('stripe');
            $table->string('gateway_ref')->nullable();
            $table->string('gateway_status')->nullable();
            $table->enum('status', ['pending', 'processing', 'completed', 'failed', 'refunded', 'partially_refunded'])->default('pending');
            $table->decimal('refund_amount', 10, 2)->default(0);
            $table->string('refund_reason')->nullable();
            $table->jsonb('metadata')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->index(['booking_id', 'status']);
            $table->index(['user_id', 'status']);
            $table->index(['gateway_ref']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
