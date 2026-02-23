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
    Schema::create('verifications', function (Blueprint $table) {
        $table->id();
        $table->foreignId('machine_id')->constrained()->onDelete('cascade');
        
        // Datos del escaneo
        $table->string('document_type');      // DNI, Pasaporte...
        $table->boolean('is_adult')->default(false);
        $table->integer('detected_age')->nullable();
        $table->string('result');             // success, failed, error
        
        // Campos adicionales que pedía tu modelo
        $table->timestamp('scanned_at')->useCurrent(); 
        $table->json('metadata')->nullable(); // Para guardar info extra del chip NFC
        
        $table->timestamps();
    });
}
        


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('verifications');
    }
};
