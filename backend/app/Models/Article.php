<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'source_id',
        'source_name',
        'author',
        'title',
        'description',
        'url',
        'urlToImage',
        'publishedAt',
        'content',
    ];

}