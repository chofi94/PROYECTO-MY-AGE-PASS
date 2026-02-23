<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Listar pagos.
     * Admin ve todo, Cliente ve solo lo suyo.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            // El admin ve todos los pagos y a qué empresa pertenecen
            return response()->json(Payment::with('company')->latest()->get());
        }

        // El cliente solo ve sus propios pagos
        return response()->json(
            Payment::where('company_id', $user->company_id)->latest()->get()
        );
    }

    /**
     * Crear un registro de pago (Solo Admin).
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
            // Si se crea como completado, ponemos la fecha de pago actual
            'paid_at'    => $validated['status'] === 'completed' ? now() : null,
        ]);

        return response()->json([
            'message' => 'Pago registrado correctamente',
            'payment' => $payment
        ], 201);
    }

    /**
     * Ver un pago específico.
     */
    public function show(Request $request, Payment $payment)
    {
        $user = $request->user();

        // Seguridad: Un cliente no puede ver pagos de otros
        if ($user->role !== 'admin' && $user->company_id !== $payment->company_id) {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        return response()->json($payment->load('company'));
    }

    /**
     * Actualizar estado del pago (Solo Admin).
     */
    public function update(Request $request, Payment $payment)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $validated = $request->validate([
            'status'  => 'required|in:pending,completed,cancelled',
            'paid_at' => 'nullable|date',
        ]);

        // Si el admin marca como 'completed' y no envía fecha, la ponemos automáticamente
        if ($validated['status'] === 'completed' && !isset($validated['paid_at'])) {
            $validated['paid_at'] = $payment->paid_at ?? now();
        }

        $payment->update($validated);

        return response()->json([
            'message' => 'Estado de pago actualizado',
            'payment' => $payment
        ]);
    }

    /**
     * Eliminar un registro de pago (Solo Admin).
     */
    public function destroy(Request $request, Payment $payment)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'No autorizado para eliminar registros contables'], 403);
        }

        $payment->delete();
        return response()->json(['message' => 'Registro de pago eliminado']);
    }
}