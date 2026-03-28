<?php

namespace App\Models;

use App\Modules\User\Models\User as ModuleUser;

class User extends ModuleUser
{
    // Bridge class so Laravel's default auth config works
}
