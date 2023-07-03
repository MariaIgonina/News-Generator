import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneNew } from '../../store/newsSlice';
import { useEffect } from 'react';
import moment from 'moment'
import './newPage.css'

export default function NewPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const article = useSelector((state) => state.news.new)

  useEffect(() => {
    dispatch(getOneNew(id));
  }, [dispatch])


  return (
    <div className='big-article'>
      <div className='big-top'>
        <div className='big-header'>
          <h2 className='art-title'>{article.title}</h2>
          <h3 className='art-author'>{article.author}</h3>
          <h4 className='art-date'>{moment(article.publishedAt).format('MMMM Do YYYY, h a')}</h4>
        </div>
      </div>
      <h5 className='art-description'>{article.description}</h5>
      <p className='art-content'>{article.content}</p>

      {article.urlToImage && <img src={article.urlToImage} className='art-photo' alt='Article' />}
      
      {article.url && (
        <div className='art-link-block'>
          <div className='art-rows'>
            <p className='art-source'>The source: </p>
            <h4 className='art-source'>{article.source_name}</h4>
          </div>
          <div className='art-rows'>
            <p className='art-source'>The original: </p>
            <a href={article.url} className='art-link'>{article.url}</a>
          </div>
        </div>
      )}
    </div>
  )
}
