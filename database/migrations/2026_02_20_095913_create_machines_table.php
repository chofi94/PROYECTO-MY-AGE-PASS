<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('machines', function (Blueprint $table) {
        $table->id();
        // Relación con la empresa
        $table->foreignId('company_id')->constrained()->onDelete('cascade');
        
        // Datos básicos
        $table->string('name');
        $table->string('type')->nullable(); // Ej: Tabaco, Bebidas, Vending...
        $table->string('location')->nullable();
        $table->string('status')->default('active'); // active, inactive, maintenance
        
        // Configuración técnica (NFC y Lector)
        $table->boolean('accepts_id_card')->default(true);
        $table->boolean('accepts_passport')->default(false);
        $table->string('reader_version')->nullable();
        $table->string('nfc_token')->unique(); 
        
        $table->timestamps();
    });
}
    
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('machines');
    }
};
