<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'status' => 'API is running',
        'message' => 'Bienvenido a la API de My Age Pass'
    ]);
});

// Elimina o comenta cualquier ruta que devuelva view('app')