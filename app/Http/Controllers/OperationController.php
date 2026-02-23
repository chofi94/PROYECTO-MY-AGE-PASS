<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OperationController extends Controller
{
    public function index(Request $request)
    {
        // Obtenemos las operaciones de la empresa a la que pertenece el usuario autenticado
        $operations = $request->user()->company->operations()->orderBy('date', 'desc')->get();
        
        return response()->json($operations);
    }
}
