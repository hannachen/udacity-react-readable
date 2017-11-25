import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import ThumbUpIcon from 'react-icons/lib/md/thumb-up'
import ThumbDownIcon from 'react-icons/lib/md/thumb-down'
import EditIcon from 'react-icons/lib/go/pencil'
import TrashIcon from 'react-icons/lib/go/trashcan'

class PostListItem extends Component {
  state = {
    loading: false,
  }
  constructor(props, context) {
    super(props, context)

    this.upVote = this.upVote.bind(this)
    this.downVote = this.downVote.bind(this)
    this.scorePost = this.scorePost.bind(this)
    this.deletePost = this.deletePost.bind(this)
  }
  upVote(e) {
    e.preventDefault()
    this.scorePost('upVote')
  }
  downVote(e) {
    e.preventDefault()
    this.scorePost('downVote')
  }
  scorePost(vote) {
    this.setState({ loading: true })
    const { post, scorePost } = this.props
    scorePost({ postId: post.id, vote })
      .then(() => this.setState(() => ({
        loading: false,
      })))
  }
  deletePost(e) {
    e.preventDefault()
    const { post, deletePost } = this.props
    deletePost(post)
  }

  render() {

    const { post } = this.props
    const formattedDate = (post && post.timestamp) ? moment.unix(post.timestamp/1000).format("MMMM DD, YYYY hh:mma") : null

    return (
      <li>
        <Link className='item-link' to={`/post/view/${post.id}`}>
          <div className='title-container'>
            <div className='title'>{post.title}</div>
            <div className='author'>
              By {post.author}
              {formattedDate &&
                <span> on {formattedDate}</span>
              }
            </div>
          </div>
          <div className='meta'>
            <div className='comments'>
              <em>COMMENTS</em>
              <span>{post.commentCount}</span>
            </div>
            <div className='score'>
              <em>SCORE</em>
              <span>{post.voteScore}</span>
            </div>
          </div>
        </Link>
        <ul className='actions'>
          <li className='post-edit'>
            <Link className='edit-item-link' to={`/post/edit/${post.id}`}>
              <EditIcon size={22} />
            </Link>
          </li>
          <li className='post-delete'>
            <button onClick={this.deletePost} className='trash'>
              <TrashIcon size={22} />
            </button>
          </li>
          <li className='post-vote'>
            <ul className='vote-options'>
              <li>
                <button onClick={this.upVote} className='upvote'>
                  <ThumbUpIcon size={22} />
                </button>
              </li>
              <li>
                <button onClick={this.downVote} className='downvote'>
                  <ThumbDownIcon size={22} />
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    )
  }
}

export default PostListItem