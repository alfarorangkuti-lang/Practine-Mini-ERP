<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();

            // Relation
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // Subscription Info
            $table->string('plan_name')->default('basic');
            $table->enum('status', [
                'pending',
                'active',
                'expired',
                'cancelled'
            ])->default('pending');

            // Date Range
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();

            // Payment Reference (Midtrans)
            $table->string('order_id')->nullable(); // order kamu
            $table->string('midtrans_transaction_id')->nullable();

            // Optional metadata
            $table->json('meta')->nullable();

            $table->timestamps();

            // Index (penting untuk performance)
            $table->index(['user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
