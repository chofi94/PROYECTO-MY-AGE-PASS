<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentsController extends Controller
{
    /**
     * Listar pagos.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            // El admin ve todos los pagos de todas las empresas
            return response()->json(Payment::with('company')->latest()->get());
        }

        // El cliente solo ve sus propios pagos
        return response()->json(Payment::where('company_id', $user->company_id)->latest()->get());
    }

    /**
     * Crear un registro de pago (Normalmente solo lo hace el Admin).
     */
    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'No tienes permiso para generar pagos'], 403);
        }

        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'amount'     => 'required|numeric|min:0',
            'status'     => 'required|in:pending,completed,cancelled',
            'reference'  => 'nullable|string',
        ]);

        $payment = Payment::create([
            'company_id' => $validated['company_id'],
            'amount'     => $validated['amount'],
            'status'     => $validated['status'],
            'reference'  => $validated['reference'],
            'paid_at'    => $validated['status'] === 'completed' ? now() : null,
        ]);

        return response()->json($payment, 201);
    }

    /**
     * Ver un pago específico.
     */
    public function show(Request $request, Payment $payment)
    {
        if ($request->user()->role !== 'admin' && $request->user()->company_id !== $payment->company_id) {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        return response()->json($payment->load('company'));
    }

    /**
     * Actualizar estado del pago (Ej: de 'pending' a 'completed').
     */
    public function update(Request $request, Payment $payment)
    {
        // Solo el admin debería poder confirmar pagos o editarlos
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $validated = $request->validate([
            'status'  => 'required|in:pending,completed,cancelled',
            'paid_at' => 'nullable|date',
        ]);

        $payment->update($validated);

        return response()->json($payment);
    }

    /**
     * Eliminar un registro de pago (Solo Admin).
     */
    public function destroy(Request $request, Payment $payment)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $payment->delete();
        return response()->json(['message' => 'Registro de pago eliminado']);
    }
}