import React from 'react'
import { Link } from 'react-router-dom'
import './categories.css'

export default function CategoryList ({ categories }) {
  return (
    <ul className='category-list'>
      <h2>Categories</h2>
      {categories && Object.keys(categories).map((category) => (
        <li key={categories[category].path}>
          <Link className='item-link' to={`/category/${categories[category].path}`}>
            <h3>{categories[category].name}</h3>
            <div className='posts'>
                <span>
                  {categories[category].postCount ?
                    (
                      <span className='post-count'>
                        {categories[category].postCount}
                        {(categories[category].postCount === 1 ? ' post' : ' posts')}
                      </span>
                    )
                    : `No posts`
                  }
                </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}