<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('operations', function (Blueprint $table) {
           
            $table->id();
        // Relacionamos la operación con la empresa
        $table->foreignId('company_id')->constrained()->onDelete('cascade');
        $table->string('type'); // Ejemplo: 'Verificación', 'Acceso', etc.
        $table->string('document')->nullable(); // Ejemplo: 'DNI', 'Pasaporte'
        $table->enum('status', ['approved', 'pending', 'rejected'])->default('pending');
        $table->timestamp('date');
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('operations');
    }
};
