import React  from 'react'
import { Link } from 'react-router-dom'
import Comment from './Comment'
import ArrowIcon from 'react-icons/lib/md/reply'

export default function CommentList ({ post, comments }) {

  // Sort high to low
  const sortedComments = comments.sort((a, b) => {
    return b.voteScore - a.voteScore
  })
  return (
    <div className='comments-list'>
      <nav className='comments-nav'>
        <h4 className='subheader'>Comments</h4>
        <Link className='new-comment-link' to={`/comment/new/${post.id}`}>
          Add comment
        </Link>
      </nav>
      <ul className='comments'>
        {sortedComments.length === 0 &&
          <li className='no-comments'>
            No comments yet. Add one now!
            <ArrowIcon size={32} />
          </li>
        }
        {sortedComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  )
}