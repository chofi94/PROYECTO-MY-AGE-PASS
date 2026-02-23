<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompaniesController; // Cambiado a singular si así es tu archivo
use App\Http\Controllers\MachineController;
use App\Http\Controllers\VerificationsController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\ContactController; 
use App\Http\Controllers\OperationController;

/*
|--------------------------------------------------------------------------
| RUTAS PÚBLICAS
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Formulario de contacto público (Para captar clientes)
Route::post('/contact', [ContactController::class, 'store']);

// Esta ruta la usa la MÁQUINA para enviar el escaneo (usa nfc_token para validar)
Route::post('/process-verification', [VerificationsController::class, 'store']);


/*
|--------------------------------------------------------------------------
| RUTAS PROTEGIDAS (Middleware Sanctum)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // --- USUARIO Y SESIÓN ---
    Route::get('/user', [AuthController::class, 'userInfo']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // --- EMPRESAS ---
    Route::apiResource('companies', CompaniesController::class);

    // --- MÁQUINAS ---
    Route::apiResource('machines', MachineController::class);
    Route::get('/companies/{company}/machines', [MachineController::class, 'getCompaniesMachines']);

    // --- VERIFICACIONES (Logs para el Dashboard) ---
    Route::get('/verifications', [VerificationsController::class, 'index']);
    Route::get('/machines/{machine}/verifications', [VerificationsController::class, 'getMachineVerifications']);

    // --- PAGOS ---
    Route::get('/payments', [PaymentsController::class, 'index']);
    Route::post('/payments', [PaymentsController::class, 'store']);

    // --- CONTACTOS (Gestión de mensajes recibidos) ---
    // Solo permitimos ver, listar y borrar. El 'store' ya es público arriba.
    Route::apiResource('contact', ContactController::class)->except(['store']);

    Route::get('/operations', [OperationController::class, 'index']);
});