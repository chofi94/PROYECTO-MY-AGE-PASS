<?php

namespace App\Http\Controllers;

use App\Models\Machine;
use Illuminate\Http\Request;
use Illuminate\Support\Str; // Para generar el token

class MachineController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            return response()->json(Machine::with('company')->get());
        }

        return response()->json(Machine::where('company_id', $user->company_id)->get());
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'location' => 'nullable|string',
            'status' => 'required|in:active,inactive,maintenance',
            // Si es admin, el company_id es obligatorio. Si es cliente, usamos el suyo.
            'company_id' => $user->role === 'admin' ? 'required|exists:companies,id' : 'nullable',
        ]);

        // Asignamos el company_id automáticamente si es un cliente
        $companyId = $user->role === 'admin' ? $validated['company_id'] : $user->company_id;

        $machine = Machine::create([
            'name' => $validated['name'],
            'type' => $validated['type'],
            'location' => $validated['location'],
            'status' => $validated['status'],
            'company_id' => $companyId,
            'nfc_token' => Str::random(32), // GENERAMOS EL TOKEN AQUÍ
        ]);

        return response()->json([
            'message' => 'Máquina creada con éxito',
            'machine' => $machine
        ], 201);
    }

    public function show(Request $request, Machine $machine)
    {
        if ($request->user()->role !== 'admin' && $request->user()->company_id !== $machine->company_id) {
            return response()->json(['message' => 'No tienes acceso'], 403);
        }

        return response()->json($machine->load('company'));
    }

    public function update(Request $request, Machine $machine)
    {
        if ($request->user()->role !== 'admin' && $request->user()->company_id !== $machine->company_id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $validated = $request->validate([
            'name' => 'string',
            'type' => 'string',
            'location' => 'string',
            'status' => 'in:active,inactive,maintenance',
        ]);

        $machine->update($validated);
        return response()->json($machine);
    }

    public function destroy(Request $request, Machine $machine)
    {
        if ($request->user()->role !== 'admin' && $request->user()->company_id !== $machine->company_id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $machine->delete();
        return response()->json(['message' => 'Máquina eliminada']);
    }

    /**
     * Método extra para que el cliente vea solo sus máquinas
     * Útil si lo llamas desde /api/companies/{id}/machines
     */
    public function getCompaniesMachines(Request $request, $companyId)
    {
        if ($request->user()->role !== 'admin' && $request->user()->company_id != $companyId) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $machines = Machine::where('company_id', $companyId)->get();
        return response()->json($machines);
    }
}