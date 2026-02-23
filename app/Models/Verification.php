<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Verification extends Model
{
    use HasFactory;

    protected $fillable = [
        'machine_id',
        'document_type',
        'is_adult',
        'detected_age',
        'result',
        'scanned_at',
        'metadata',
    ];

    /**
     * Esto convierte el JSON de la base de datos a un array de PHP automáticamente
     */
    protected $casts = [
        'metadata' => 'array',
        'is_adult' => 'boolean',
        'scanned_at' => 'datetime',
    ];

    public function machine()
    {
        return $this->belongsTo(Machine::class);
    }
}