import React from 'react'
import { Link } from 'react-router-dom'
import './categories.css'

export default function CategoryList ({ categories, posts }) {
  return (
    <ul className='category-list'>
      {categories && posts && Object.keys(categories).map((category) => (
        <li key={categories[category].path}>
          <Link className='item-link' to={`/category/${categories[category].path}`}>
            <h3>{categories[category].name}</h3>
            <div className='posts'>
                <span>
                  {posts['byCategory'][category] ?
                    `${posts['byCategory'][category].length} posts` : `No posts`
                  }
                </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}