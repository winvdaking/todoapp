<?php

/**
 * Service Provider d'authentification Laravel
 * 
 * Ce service provider configure :
 * - Les politiques d'autorisation
 * - Les guards d'authentification
 * - Les providers d'utilisateurs
 * - Les configurations de sécurité
 */

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
