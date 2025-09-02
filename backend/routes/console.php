<?php

/**
 * Routes console de l'application Laravel
 * 
 * Ce fichier définit :
 * - Les commandes Artisan personnalisées
 * - Les tâches planifiées
 * - Les commandes de maintenance
 * - Les utilitaires de développement
 */

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');