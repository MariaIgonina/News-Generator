<?php

namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;

class FetchNewsNYT extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch-news-nyt';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $apiKey = config('parses.nyt_key');
        $apiUrl = "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key={$apiKey}";
        $response = file_get_contents($apiUrl);
        $articles = json_decode($response, true)['results'];

        if (is_array($articles) && count($articles) > 0) {
            foreach ($articles as $articleData) {
                if (isset($articleData['media']) && is_array($articleData['media']) && count($articleData['media']) > 0) {
                    $mediaMetadata = $articleData['media'][0]['media-metadata'];

                    $mediaUrlToImage = '';
                    if (is_array($mediaMetadata) && count($mediaMetadata) > 0) {
                        foreach ($mediaMetadata as $metadata) {
                            if ($metadata['format'] === 'Standard Thumbnail') {
                                $mediaUrlToImage = $metadata['url'];
                                break;
                            }
                        }
                    }

                    Article::updateOrCreate([
                        'source_name' => $articleData['source'],
                        'category' => $articleData['section'],
                        'author' => $articleData['byline'],
                        'title' => $articleData['title'],
                        'description' => $articleData['abstract'],
                        'url' => $articleData['url'],
                        'urlToImage' => $mediaUrlToImage,
                        'publishedAt' => trim(preg_replace("/T|Z/", ' ', $articleData['published_date'])),
                    ]);
                }
            }
            $this->info('News from The NewsAPI successfully saved!');
        } else {
            throw new Exception('There is an error with index');
        }
    }
};
