import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchComments } from '../../actions'
import api from '../../utils/api'
import Comment from './Comment'
import AddComment from './AddComment'
import ArrowIcon from 'react-icons/lib/md/reply'
import CloseIcon from 'react-icons/lib/go/x'
import './comments.css'

class CommentList extends Component {
  state = {
    addComment: false,
  }
  constructor(props, context) {
    super(props, context)

    this.fetchComments = this.fetchComments.bind(this)
    this.onAddComment = this.onAddComment.bind(this)
    this.exitAddComment = this.exitAddComment.bind(this)

    this.fetchComments()
  }

  fetchComments() {
    const { post } = this.props
    const postId = post.id
    api.fetchPostComments(postId)
      .then((comments) => {
        const { fetchComments } = this.props
        fetchComments({postId, comments})
      })
  }

  onAddComment() {
    this.setState({ addComment: true })
  }

  exitAddComment() {
    this.setState({ addComment: false })
  }

  render() {
    const { post, comments } = this.props
    const { addComment } = this.state

    // Sort high to low
    const sortedComments = comments.sort((a, b) => {
      return b.voteScore - a.voteScore
    })

    return (
      <div className='comments-list'>
        <nav className='comments-nav'>
          <h4 className='subheader'>{addComment ? `Add a comment` : `Comments` }</h4>
          {addComment ?
            <button className='icon-btn' onClick={this.exitAddComment} >
              <CloseIcon size={20} />
            </button>
            :
            <div className='new-comment-link' onClick={this.onAddComment}>
            Add comment
            </div>
          }
        </nav>
        {addComment ?
          <AddComment postId={post.id} onSuccess={this.exitAddComment} />
          :
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
        }
      </div>
    )
  }
}

const mapStateToProps = ({ comments }, ownProps) => {
  const { post } = ownProps
  const postComments = comments['byPost'][post.id] || []
  return {
    comments: postComments.map((comment) => (comments['all'][comment])) || null,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (data) => dispatch(fetchComments(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentList)