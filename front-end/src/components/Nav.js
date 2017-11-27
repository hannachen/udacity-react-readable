import React  from 'react'
import { Link } from 'react-router-dom'

export default function Nav ({ category, post, title }) {

  const categoryName = (post || title) ? <Link to={`/category/${category.path}`}>{category.name}</Link> : <strong>{category.name}</strong>
  return (
    <div className='breadcrumb'>
      <nav className='category-nav'>
        <h1>
          <em>Category</em>
          {categoryName}
        </h1>
        {title ?
          <h2 className='subtitle'>{title}</h2>
          :
          <Link className="new-item-link" to={`/newPost/${category.path}`}>
            Add Post
          </Link>
        }
      </nav>
      {post &&
        <nav className='post-nav'>
          <h1>
            <em>Post</em>
            <strong>{post.title}</strong>
          </h1>
          {title ?
            <h2 class='subtitle'>{title}</h2>
            :
            <Link className='new-item-link' to={`/editPost/${post.id}`}>
              Edit Post
            </Link>
          }
        </nav>
      }
    </div>
  )
}