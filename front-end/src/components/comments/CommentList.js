import React  from 'react'
import { Link } from 'react-router-dom'
import Comment from './Comment'

export default function CommentList ({ post, comments }) {

  // Sort high to low
  const sortedComments = comments.sort((a, b) => {
    return b.voteScore - a.voteScore
  })
  return (
    <div className='comments-list'>
      <nav className='comments-nav'>
        <h3 className='subheader'>Comments</h3>
        <Link to={`/comment/new/${post.id}`}>
          Add comment
        </Link>
      </nav>
      <ul>
        {sortedComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  )
}