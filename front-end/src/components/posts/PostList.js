import React  from 'react'
import { Link } from 'react-router-dom'
import ArrowIcon from 'react-icons/lib/md/reply'
import './posts.css'

export default function PostList ({ posts }) {

  return (
    <ul className='post-list'>
      {(!posts || posts.length === 0) &&
        <p className='no-posts'>
          No posts yet. Add one now!
          <ArrowIcon size={32} />
        </p>
      }
      {posts.map((post) => (
        <li key={post.id}>
          <Link className='item-link' to={`/post/view/${post.id}`}>
            <div className='title-container'>
              <div className='title'>{post.title}</div>
              <div className='author'>by {post.author}</div>
            </div>
            <div className='meta'>
              <div className='score'>
                <em>SCORE</em>
                <span>{post.voteScore}</span>
              </div>
              <div className='comments'>
                <em>COMMENTS</em>
                <span>{post.commentCount}</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
