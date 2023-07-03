<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Article;
use App\Models\Preferences;
use Illuminate\Http\Request;
use App\Models\UserPreference;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ArticlesController extends Controller
{
    //This function gets the search request and returns the result
    //In case saveSearch===true, we save it to the DB as preferences
    public function newSearch(Request $request)
{
    $keyword = $request->input('keyword');
    $categories = $request->input('categories', []);
    $authors = $request->input('authors', []);
    $sources = $request->input('sources', []);
    $startDate = $request->input('startDate');
    $endDate = $request->input('endDate');
    $saveSearch = $request->input('saveSearch') ?? false;
    
    $query = Article::query();
    
    if (!empty($keyword)) {
        $query->where('title', 'LIKE', '%'.$keyword.'%');
    }
    
    if (!empty($categories)) {
        $query->whereIn('category', $categories);
    }
    
    if (!empty($authors)) {
        $query->whereIn('author', $authors);
    }
    
    if (!empty($sources)) {
        $query->whereIn('source_name', $sources);
    }
    
    if (!empty($startDate)) {
        $query->where('publishedAt', '>=', $startDate);
    }
    
    if (!empty($endDate)) {
        $query->where('publishedAt', '<=', $endDate);
    }
    
    $results = $query->get();

    $user = Auth::user();

    if ($saveSearch && $user !== null) {
        $preference = Preferences::create([
            'categories' => json_encode($categories),
            'sources' => json_encode($sources),
            'authors' => json_encode($authors),
            'user_id' => $user->id
        ]);
    }
    return response()->json($results);
}


    public function getNews()
    {
        $articles = Article::orderBy('publishedAt', 'desc')->take(50)->get();
        return response()->json($articles);
    }

    public function getOneNew($id)
    {
        $article = Article::find($id);
        return $article;
    }

    public function getOptions()
    {  
        $categories = Article::distinct('category')
            ->whereNotNull('category')
            ->pluck('category')
            ->toArray();
        $authors = Article::distinct('author')
            ->whereNotNull('author')
            ->pluck('author')
            ->toArray();
        $sources = Article::distinct('source_name')
            ->whereNotNull('source_name')
            ->pluck('source_name')
            ->toArray();
        return response()->json([
            'categories' => $categories,
            'authors' => $authors,
            'sources' => $sources
        ]);
    }

    public function suggestions(Request $request)
    {   
        if (Auth::check()) {
            $user = Auth::user();
            $userPreferences = Preferences::where('user_id', $user->id)->first();

            if (!$userPreferences) return response()->json([]);

            $categories = json_decode($userPreferences->categories);
            $authors = json_decode($userPreferences->authors);
            $sources = json_decode($userPreferences->sources);

            $suggestions = Article::whereIn('category', $categories)
                ->orWhereIn('author', $authors)
                ->orWhereIn('source_name', $sources)
                ->get();

            return response()->json($suggestions);
        }
    }
}