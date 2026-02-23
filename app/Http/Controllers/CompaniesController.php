<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompaniesController extends Controller
{
    /**
     * Listar empresas.
     * Solo el ADMIN debería ver todas.
     */
    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'No tienes permiso para ver todas las empresas'], 403);
        }

        return response()->json(Company::all(), 200);
    }

    /**
     * Crear una empresa manualmente.
     * (Recuerda que ya se crean solas en el Register, pero el Admin podría querer crear una aparte).
     */
    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|unique:companies|max:255',
            'cif' => 'nullable|string|unique:companies', // Código de Identificación Fiscal
            'address' => 'nullable|string',
        ]);

        $company = Company::create($validated);

        return response()->json($company, 201);
    }

    /**
     * Ver los datos de UNA empresa.
     */
    public function show(Request $request, Company $company)
    {
        // Seguridad: Un cliente solo puede ver SU empresa
        if ($request->user()->role !== 'admin' && $request->user()->company_id !== $company->id) {
            return response()->json(['message' => 'No tienes permiso para ver esta empresa'], 403);
        }

        return response()->json($company);
    }

    /**
     * Actualizar datos de la empresa.
     */
    public function update(Request $request, Company $company)
    {
        // Seguridad: Un cliente solo puede editar SU empresa
        if ($request->user()->role !== 'admin' && $request->user()->company_id !== $company->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $validated = $request->validate([
            'name' => 'string|max:255|unique:companies,name,' . $company->id,
            'cif' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        $company->update($validated);

        return response()->json([
            'message' => 'Empresa actualizada correctamente',
            'company' => $company
        ]);
    }

    /**
     * Borrar una empresa.
     */
    public function destroy(Request $request, Company $company)
    {
        // Solo el Admin puede borrar empresas
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Solo el administrador puede eliminar empresas'], 403);
        }

        $company->delete();
        return response()->json(['message' => 'Empresa eliminada correctamente']);
    }
}