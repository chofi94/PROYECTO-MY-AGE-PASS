<?php

namespace App\Http\Controllers;

use App\Models\Verification;
use App\Models\Machine;
use Illuminate\Http\Request;

class VerificationsController extends Controller // Cambiado a singular
{
    /**
     * Listar el historial de verificaciones.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            return response()->json(Verification::with('machine.company')->latest()->get());
        }

        return response()->json(
            Verification::whereHas('machine', function($query) use ($user) {
                $query->where('company_id', $user->company_id);
            })->with('machine')->latest()->get()
        );
    }

    /**
     * Registrar un nuevo escaneo (Hardware NFC).
     */
    public function store(Request $request)
    {
        // 1. Validamos los campos según nuestra nueva estructura de DB
        $validated = $request->validate([
            'machine_id'    => 'required|exists:machines,id',
            'document_type' => 'required|string', 
            'detected_age'  => 'required|integer',
            'result'        => 'required|in:success,failed',
            'metadata'      => 'nullable|array',
        ]);

        // 2. Lógica de negocio: ¿Es mayor de edad?
        $isAdult = $validated['detected_age'] >= 18;

        // 3. Crear el registro (Usando el modelo en SINGULAR: Verification)
        $verification = Verification::create([
            'machine_id'    => $validated['machine_id'],
            'document_type' => $validated['document_type'],
            'is_adult'      => $isAdult,
            'detected_age'  => $validated['detected_age'],
            'result'        => $validated['result'],
            'scanned_at'    => now(),
            'metadata'      => $validated['metadata'], // Laravel lo convierte a JSON automáticamente si está en $casts
        ]);

        return response()->json([
            'message'        => 'Escaneo registrado',
            'access_granted' => $isAdult,
            'id'             => $verification->id
        ], 201);
    }

    /**
     * Ver detalle de una verificación.
     */
    public function show(Request $request, Verification $verification)
    {
        $machine = $verification->machine;
        
        if ($request->user()->role !== 'admin' && $request->user()->company_id !== $machine->company_id) {
            return response()->json(['message' => 'No tienes permiso'], 403);
        }

        return response()->json($verification->load('machine'));
    }

    /**
     * Eliminar registros (Solo Admin).
     */
    public function destroy(Request $request, Verification $verification)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        $verification->delete();
        return response()->json(['message' => 'Registro eliminado']);
    }
}