<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    use HasFactory;

    protected $fillable = [
      'company_id',
        'name',
        'type',
        'location',
        'status',
        'accepts_id_card',
        'accepts_passport',
        'reader_version',
        'nfc_token', // Relación con la empresa
    ];

    /**
     * Relación inversa: Una máquina pertenece a una empresa.
     */
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Relación: Una máquina tiene muchas verificaciones de edad.
     */
    public function verifications()
    {
        return $this->hasMany(Verification::class);
    }
}