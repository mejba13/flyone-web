<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = ['user', 'provider', 'admin', 'super_admin'];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        $permissions = [
            'manage_bookings', 'manage_users', 'manage_providers',
            'manage_routes', 'manage_promos', 'manage_blog',
            'view_analytics', 'manage_settings',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        Role::findByName('admin')->givePermissionTo($permissions);
        Role::findByName('super_admin')->givePermissionTo($permissions);
        Role::findByName('provider')->givePermissionTo(['manage_routes', 'manage_bookings']);
    }
}
