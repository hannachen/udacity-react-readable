import React  from 'react'
import { Link } from 'react-router-dom'

export default function PostList ({ posts }) {

  return (
    <ul className='post-list'>
      {posts.map((post) => (
        <li key={post.id}>
          <Link className='post-link' to={`/post/view/${post.id}`}>
            <div className='title-container'>
              <div className='title'>{post.title}</div>
              <div className='author'>by {post.author}</div>
            </div>
            <div className='comments'>
              <span>{post.commentCount} comments</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
