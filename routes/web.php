<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';


/*
SUPUESTA RUTA UNICA PARA HACER QUE SI EL NAVGADRO NO E UNA RUTA API LE DEJA A REACT QUE SE ENCARGUE DE TODO <?php

use Illuminate\Support\Facades\Route;

// Esta ruta atrapa "cualquier cosa" que el usuario escriba en la barra del navegador
Route::get('/{any}', function () {
    // Aquí 'app' es el nombre de tu archivo blade (app.blade.php) 
    // que contiene el div id="root" donde se carga React.
    return view('app'); 
})->where('any', '.*');

*/