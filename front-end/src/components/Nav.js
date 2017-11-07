import React  from 'react'
import { Link } from 'react-router-dom'

export default function Nav ({ category, post }) {
  console.log(category)
  return (
    <div className='breadcrumb'>
      <nav className='category-nav'>
        <h1>
          <em>Category</em>
          <strong>{category.name}</strong>
        </h1>
        <Link className="new-item-link" to={`/post/new/${category.path}`}>
          Add Post
        </Link>
      </nav>
      {post &&
        <nav className='post-nav'>
          <h1>
            <em>Post</em>
            <strong>{post.title}</strong>
          </h1>
          <Link className='new-item-link' to={`/post/edit/${post.id}`}>
            Edit Post
          </Link>
        </nav>
      }
    </div>
  )
}