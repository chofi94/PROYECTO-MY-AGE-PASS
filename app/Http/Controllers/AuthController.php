<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // 1. Añadimos 'cif' a la validación
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'company_name' => 'required|string|max:255|unique:companies,name',
            'cif' => 'required|string|max:20|unique:companies,cif',
            'address' => 'required|string|max:255'
        ]);

        return DB::transaction(function () use ($request) {
            
            // 2. Crear empresa incluyendo el CIF
            $company = Company::create([
                'name' => $request->company_name,
                'cif'  => $request->cif, 
                'address' => $request->address 
            ]);

            // 3. Crear usuario
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'company_id' => $company->id,
                'role' => 'client', 
            ]);

            // 4. GENERAR TOKEN
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Registro completado con éxito.',
                'access_token' => $token,
                'token_type' => 'Bearer',
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

        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user->load('company')
        ]);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Sesión cerrada']);
    }

    public function userInfo(Request $request) {
        return response()->json($request->user()->load('company'));
    }
}