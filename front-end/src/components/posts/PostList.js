import React  from 'react'
import { Link } from 'react-router-dom'

export default function PostList ({ posts }) {

  return (
    <ul className='post-list'>
      {posts.map((post) => (
        <li key={post.id}>
          <h4>
            <Link to={`/post/view/${post.id}`}>{post.title}</Link>
          </h4>
          <p>{post.commentCount} comments</p>
          <p>{post.author}</p>
        </li>
      ))}
    </ul>
  )
}
