<?php

namespace App\Http\Controllers;

use App\Models\Machine;
use Illuminate\Http\Request;

class MachineController extends Controller
{
    /**
     * Listar máquinas según el rol.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            // El admin ve todas las máquinas y a qué empresa pertenecen
            return response()->json(Machine::with('company')->get());
        }

        // El cliente solo ve las máquinas de su empresa
        return response()->json(Machine::where('company_id', $user->company_id)->get());
    }

    /**
     * Guardar una nueva máquina.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'location' => 'nullable|string',
            'status' => 'required|in:active,inactive,maintenance',
            'company_id' => 'required|exists:companies,id',
        ]);

        // Seguridad: Si no es admin, solo puede crear máquinas para SU empresa
        if ($request->user()->role !== 'admin' && $request->user()->company_id != $validated['company_id']) {
            return response()->json(['message' => 'No puedes crear máquinas para otra empresa'], 403);
        }

        $machine = Machine::create($validated);

        return response()->json($machine, 201);
    }

    /**
     * Ver una máquina concreta.
     */
    public function show(Request $request, Machine $machine)
    {
        // Comprobar si el usuario tiene permiso para ver ESTA máquina
        if ($request->user()->role !== 'admin' && $request->user()->company_id !== $machine->company_id) {
            return response()->json(['message' => 'No tienes acceso a esta máquina'], 403);
        }

        return response()->json($machine->load('company'));
    }

    /**
     * Actualizar datos (ubicación, estado...).
     */
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

    /**
     * Borrar máquina.
     */
    public function destroy(Request $request, Machine $machine)
    {
        if ($request->user()->role !== 'admin' && $request->user()->company_id !== $machine->company_id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $machine->delete();
        return response()->json(['message' => 'Máquina eliminada correctamente']);
    }
}