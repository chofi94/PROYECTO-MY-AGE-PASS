<?php

namespace App\Http\Controllers;

use App\Models\Verification;
use App\Models\Machine;
use Illuminate\Http\Request;

class VerificationsController extends Controller
{
    /**
     * Listar el historial de verificaciones.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // El Admin ve absolutamente todo el historial del sistema
        if ($user->role === 'admin') {
            return response()->json(Verification::with('machine.company')->latest()->get());
        }

        // El Cliente solo ve los escaneos de SUS máquinas
        return response()->json(
            Verification::whereHas('machine', function($query) use ($user) {
                $query->where('company_id', $user->company_id);
            })->with('machine')->latest()->get()
        );
    }

    /**
     * Registrar un nuevo escaneo (Esta ruta la llamará la máquina física).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'machine_id' => 'required|exists:machines,id',
            'result'     => 'required|in:success,failed',
            'metadata'   => 'nullable|array',
        ]);

        $verification = Verifications::create([
            'machine_id' => $validated['machine_id'],
            'result'     => $validated['result'],
            'scanned_at' => now(), // Registramos el momento exacto
            'metadata'   => isset($validated['metadata']) ? json_encode($validated['metadata']) : null,
        ]);

        return response()->json([
            'message' => 'Escaneo registrado',
            'id' => $verification->id
        ], 201);
    }

    /**
     * Ver detalle de una verificación específica.
     */
    public function show(Request $request, Verifications $verification)
    {
        // Comprobar que la verificación pertenece a una máquina de la empresa del usuario
        $machine = $verification->machine;
        
        if ($request->user()->role !== 'admin' && $request->user()->company_id !== $machine->company_id) {
            return response()->json(['message' => 'No tienes permiso'], 403);
        }

        return response()->json($verification->load('machine'));
    }

    /**
     * Eliminar registros (Generalmente solo el Admin debería poder limpiar el historial).
     */
    public function destroy(Request $request, Verifications $verification)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Solo el administrador puede borrar historiales'], 403);
        }

        $verification->delete();
        return response()->json(['message' => 'Registro eliminado']);
    }
}