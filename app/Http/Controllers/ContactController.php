<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Ver todos los mensajes de contacto.
     * Solo para el Admin de la web.
     */
    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'No tienes permiso'], 403);
        }

        return response()->json(Contact::latest()->get());
    }

    /**
     * Guardar un nuevo mensaje (Formulario de contacto de la web).
     * Este método NO necesita login, es para visitantes.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $contact = Contact::create([
            'name'    => $validated['name'],
            'email'   => $validated['email'],
            'subject' => $validated['subject'] ?? 'Nuevo mensaje de contacto',
            'message' => $validated['message'],
            'status'  => 'pending'
        ]);

        return response()->json([
            'message' => 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.'
        ], 201);
    }

    /**
     * Ver un mensaje específico.
     */
    public function show(Request $request, Contact $contact)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        // Al verlo, lo marcamos como leído automáticamente
        $contact->update(['status' => 'read']);

        return response()->json($contact);
    }

    /**
     * Eliminar un mensaje.
     */
    public function destroy(Request $request, Contact $contact)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $contact->delete();
        return response()->json(['message' => 'Mensaje eliminado']);
    }
}