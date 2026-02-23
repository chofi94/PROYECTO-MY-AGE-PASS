<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
   'user_id',
    'company_id',
    'amount',
    'currency',
    'status',
    'transaction_id',
    'paid_at',      // Fecha del pago
];   // Fecha exacta del pago
    

    /**
     * Un pago pertenece a una empresa.
     */
    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}