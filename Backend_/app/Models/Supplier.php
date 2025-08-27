<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'company',
        'delivery_dates',
    ];

    protected $casts = [
        'delivery_dates' => 'array',
    ];
}
