import React from 'react'
import GlobalSearch from '../../components/globalSearch/globalSearch'
import NewsList from '../../components/newsList/newsList'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getNews, getSuggestions } from '../../store/newsSlice';
import './home.css'
import { useState } from 'react';
import Button from '@mui/material/Button';

const NEWS_ON_PAGE = 8;

export default function Home({searchIsOpen, setSearchIsOpen}) {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const allNews = useSelector((state) => state.news.news);
  const search = useSelector((state) => state.news.search);
  const suggestions = useSelector((state) => state.news.suggestions);

  useEffect(() => {
      dispatch(getNews());
      if(token) { 
        dispatch(getSuggestions()) 
      };
  }, [dispatch, token]);


  //To show more results logic
  const [showMoreSearch, setShowMoreSearch] = useState(false);
  const [showMoreSuggestions, setShowMoreSuggestions] = useState(false);
  const [showMoreAllNews, setShowMoreAllNews] = useState(false);

  const handleShowMoreSearch = () => {
    setShowMoreSearch(true);
  };

  const handleShowMoreSuggestions = () => {
    setShowMoreSuggestions(true);
  };

  const handleShowMoreAllNews = () => {
    setShowMoreAllNews(true);
  };

  const searchResults = showMoreSearch ? search : search.slice(0, NEWS_ON_PAGE);
  const suggestionResults = showMoreSuggestions ? suggestions : suggestions.slice(0, NEWS_ON_PAGE);
  const allNewsResults = showMoreAllNews ? allNews : allNews.slice(0, NEWS_ON_PAGE);
  
  return (
    <div className='home-container'>
      {searchIsOpen &&
        <GlobalSearch
          setSearchIsOpen = {setSearchIsOpen}
        />
      }
      {token && (
        <>
          {searchResults.length > 0 && (
            <>
              <h2 className='list-header'>Search Results</h2>
              <NewsList news={searchResults} />
              {!showMoreSearch && search.length > NEWS_ON_PAGE && (
                <Button className="show-all" onClick={handleShowMoreSearch}>Show All News</Button>
              )}
            </>
          )}
          {suggestionResults.length > 0 && (
            <>
              <h2 className='list-header'>Your Personal Feed</h2>
              <NewsList news={suggestionResults} />
              {!showMoreSuggestions && suggestions.length > NEWS_ON_PAGE && (
                <Button className="show-all" onClick={handleShowMoreSuggestions}>Show All News</Button>
              )}
            </>
          )}
        </>
      )}
      <h2 className='list-header'>All News</h2>
      <p className='list-recomendations'>
        {token
          ? 'If you want to customize your feed, please save your search!'
          : 'If you want to customize your feed, please sign in and save your searches!'}
      </p>
      <NewsList news={allNewsResults} />
      {!showMoreAllNews && allNews.length > NEWS_ON_PAGE && (
        <Button className="show-all" onClick={handleShowMoreAllNews}>Show All News</Button>
      )}
    </div>
  );
};