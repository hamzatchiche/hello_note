<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = [
        'user_id',
        'note_text',
        'is_favorite',
        'is_trash'
    ];
}
