<?php

namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;

class FetchNewsGuard extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch-news-guard';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetches and saves the latest news from Guardian API';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $apiKey = config('parses.guardian_key');
        $apiUrl = "https://content.guardianapis.com/search?api-key=" . $apiKey . "&order-by=newest&show-fields=bodyText&page-size=50";

        $response = file_get_contents($apiUrl);
        // echo $response;

        $articles = json_decode($response, true)['response']['results'];

        foreach ($articles as $articleData) {
            Article::updateOrCreate(
                ['url' => $articleData['webUrl']],
                [
                    'category' => $articleData['sectionName'],
                    'source_id' => $articleData['id'],
                    'source_name' => isset($articleData['pillarName']) ? $articleData['pillarName'] : null,
                    'title' => $articleData['webTitle'],
                    'url' => $articleData['webUrl'],
                    'publishedAt' => trim(preg_replace("/T|Z/", ' ', $articleData['webPublicationDate'])),
                    'content' => $articleData['fields']['bodyText'] ?? null,
                    'source' => 'Guardian',
                ]
            );
        }
        $this->info('News from The Guardian successfully saved!');
    } 
};