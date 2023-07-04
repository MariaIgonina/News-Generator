<?php

namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;

class FetchNewsNewsapi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch-news-newsapi';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetches and saves the latest news from NewsAPI';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $apiKey = config('parses.newsapi_key');

        $apiUrl = "https://newsapi.org/v2/everything?domains=wsj.com&apiKey={$apiKey}&pageSize=50";
  
        $response = file_get_contents($apiUrl);
        // echo $response;

        $articles = json_decode($response, true)['articles'];

        foreach ($articles as $articleData) {
            Article::updateOrCreate(

                [
                    'source_name' => $articleData['source']['name'],
                    'author' => $articleData['author'],
                    'title' => $articleData['title'],
                    'description' => $articleData['description'],
                    'url' => $articleData['url'],
                    'urlToImage' => $articleData['urlToImage'],
                    'publishedAt' => trim(preg_replace("/T|Z/", ' ', $articleData['publishedAt'])),
                    'content' => $articleData['content'],
                ]
            );
        }
        $this->info('News from The NewsAPI successfully saved!');
    } 
};