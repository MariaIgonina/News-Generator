import React from 'react'
import "./oneNew.css"
import { useNavigate } from 'react-router-dom';

import moment from 'moment'

export default function OneNew({article}) {
  const navigate = useNavigate()
  const newId = article.id;

  return (
    <div className='one-new' onClick={() => {
      navigate(`/thisnew/${newId}`);
    }}>
    <div className='top'>
      
      <div className='header'>
        <h4 className='title'>{article.title}</h4>
        <h4 className='author'>{article.author}</h4>
      </div>
      {article.urlToImage &&
        <img src={article.urlToImage} alt="Article" className='photo'/>
      }
    </div>
    <p className='description'>{article.description}</p>
    <h4 className='date'>{moment(article.publishedAt).startOf('hour').fromNow()}</h4>
    <h4 className='new-category'>#{article.category}</h4>
  </div>
  )
}
