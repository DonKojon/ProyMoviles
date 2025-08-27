<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RoleSeeder::class);

        // Create a test administrator user
        $adminUser = User::create([
            'name' => 'Admin User',
            'email' => 'test@test',
            'password' => Hash::make('12345678'), // You can change the password here
        ]);

        $adminRole = Role::where('name', 'administrador')->first();
        if ($adminRole) {
            $adminUser->roles()->attach($adminRole->id);
        }

        // User::factory(10)->create(); // Uncomment if you want to create more dummy users

        // Keep the existing test user factory creation if still needed
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
