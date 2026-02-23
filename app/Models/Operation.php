<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Operation extends Model
{
    protected $fillable = [
    'company_id',
    'type',
    'document',
    'status',
    'date',
];
}
