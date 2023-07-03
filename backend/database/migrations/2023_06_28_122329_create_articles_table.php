<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('category', 300)->nullable();
            $table->string('source_id', 300)->nullable();
            $table->string('source_name', 300)->nullable();
            $table->string('author', 300)->nullable();
            $table->string('title', 300)->nullable();
            $table->string('description', 300)->nullable();
            $table->string('url', 300)->nullable();
            $table->string('urlToImage', 300)->nullable();
            $table->dateTime('publishedAt')->nullable();
            $table->text('content')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
