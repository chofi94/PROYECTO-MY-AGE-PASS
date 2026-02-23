<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    /**
     * Los campos que se pueden rellenar masivamente.
     * Si no los pones aquí, el Controller no podrá guardar nada.
     */
    protected $fillable = [
        'name',
        'cif',
        'address',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relaciones
    |--------------------------------------------------------------------------
    */

    /**
     * Una empresa tiene muchos usuarios (empleados/admins de la empresa).
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }

    /**
     * Una empresa tiene muchas máquinas.
     */
    public function machines()
    {
        return $this->hasMany(Machine::class);
    }
}