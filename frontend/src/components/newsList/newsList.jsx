import React from 'react'
import OneNew from '../oneNew/oneNew';
import "./newsList.css"

export default function NewsList({news}) {

  return (
    <div>
      {news && (
        <ul className='news-box'>
          {news.map((article) => (
            <li key={article.id}>
              <OneNew article={article} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
