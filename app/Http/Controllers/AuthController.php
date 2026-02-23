<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Company; // Añadido
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB; // Añadido para seguridad

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'company_name' => 'required|string|max:255|unique:companies,name',
        ]);

        // Usamos una transacción para que se cree TODO o NADA
        return DB::transaction(function () use ($request) {
            
            // 1. Crear empresa
            $company = Company::create([
                'name' => $request->company_name,
            ]);

            // 2. Crear usuario
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'company_id' => $company->id,
                'role' => 'client', 
            ]);

            return response()->json([
                'message' => 'Registro completado con éxito.',
                'user' => $user->load('company')
            ], 201);
        });
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user->load('company') // Es mejor enviar la empresa también en el login
        ]);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Sesión cerrada']);
    }

    public function userInfo(Request $request) {
        return response()->json([
            'user' => $request->user(),
            'company' => $request->user()->company 
        ]);
    }
}