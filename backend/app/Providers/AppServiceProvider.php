<?php

/**
 * Service Provider principal de l'application Laravel
 * 
 * Ce service provider configure :
 * - Les services de base de l'application
 * - Les bindings et singletons
 * - Les configurations globales
 * - Les événements et listeners
 */

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Configuration pour SQLite
        Schema::defaultStringLength(191);

        // Configuration des timeouts pour les requêtes longues
        if (config('app.debug')) {
            \DB::whenQueryingForLongerThan(5000, function ($connection) {
                Log::warning("Database query exceeded 5 seconds on connection: " . $connection->getName());
            });
        }
    }
}