import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchComments } from '../../actions'
import api from '../../utils/api'
import Comment from './Comment'
import AddComment from './AddComment'
import ArrowIcon from 'react-icons/lib/md/reply'
import CloseIcon from 'react-icons/lib/go/x'
import './comments.css'
import SortBy from '../SortBy'

class CommentList extends Component {
  state = {
    order: 'desc',
    orderBy: 'voteScore',
    addComment: false,
  }
  constructor(props, context) {
    super(props, context)

    this.fetchComments = this.fetchComments.bind(this)
    this.onAddComment = this.onAddComment.bind(this)
    this.exitAddComment = this.exitAddComment.bind(this)
    this.onSort = this.onSort.bind(this)
    this.sortComments = this.sortComments.bind(this)

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
  onSort(e) {
    const { order, orderBy } = this.state
    const sortField = e.target.value
    const sortOrder = (order === 'desc' && sortField === orderBy) ? 'asc' : 'desc' // Toggle or use default sort order of 'desc'
    this.setState({
      order: sortOrder,
      orderBy: sortField
    })
  }
  sortComments() {
    const { comments } = this.props
    const { order, orderBy } = this.state

    const sortedComments = comments.sort((a, b) => {
      return b[orderBy] - a[orderBy]
    })

    if (order === 'asc') {
      sortedComments.reverse()
    }

    return sortedComments
  }

  render() {
    const { post, comments } = this.props
    const { order, orderBy, addComment } = this.state

    // Sort high to low
    const sortedComments = comments ? this.sortComments() : null

    return (
      <div className='comments-list'>
        <nav className='comments-nav'>
          <h4 className='subheader'>{addComment ? `Add a comment` : `Comments` }</h4>
          {!addComment &&
            <SortBy
              title='Sort comments'
              fields={['voteScore', 'timestamp']}
              order={order}
              orderBy={orderBy}
              onSort={this.onSort}
              disabled={(comments.length <= 1)}
            />
          }
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
    comments: postComments.map((comment) => (comments['all'][comment])).filter((post) => (!post.deleted)) || null,
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