import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editComment, scoreComment, deleteComment } from '../../actions'
import api from '../../utils/api'
import CommentForm from './CommentForm'

class Comment extends Component {
  state = {
    editing: false,
    voting: false,
    comment: null
  }
  constructor(props, context) {
    super(props, context)

    const { comment } = props
    this.state = {
      comment
    }

    this.toggleForm = this.toggleForm.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.upVote = this.upVote.bind(this)
    this.downVote = this.downVote.bind(this)
    this.scoreComment = this.scoreComment.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
  }
  toggleForm() {
    this.setState({
      editing: !this.state.editing
    })
  }
  onChange(e) {
    const { comment } = this.state
    comment[e.target.name] = e.target.value
    this.setState({ comment })
  }
  onSubmit(e) {
    e.preventDefault()

    const { comment } = this.state
    const timestamp = Math.floor(Date.now() / 1000)
    const data = {
      ...comment,
      timestamp
    }

    const { editComment } = this.props
    api.editComment(data)
      .then(editComment)
      .then(() => this.toggleForm())
  }
  upVote() {
    this.scoreComment('upVote')
  }
  downVote() {
    this.scoreComment('downVote')
  }
  scoreComment(vote) {
    this.setState(() => ({ voting: true }))
    const { comment, scoreComment } = this.props
    api.scoreComment(comment.id, vote)
      .then(scoreComment)
      .then((res) => this.setState(() => ({
        voting: false,
        comment: res.comment,
      })))
  }
  deleteComment() {
    const { comment, deleteComment } = this.props
    api.deleteComment(comment.id)
      .then(() => {
        deleteComment(comment)
      })
      .then((comment) => this.setState(() => ({
        comment
      })))
  }

  render() {
    const { editing, voting, comment } = this.state

    if (comment.deleted) {
      return null
    }
    return (
      <li className='comment-container'>
        <ul>
          <li><button onClick={this.upVote} disabled={voting} className='upvote'>Upvote</button></li>
          <li><button onClick={this.downVote} disabled={voting} className='downvote'>Downvote</button></li>
        </ul>
        <div className="votescore">{comment.voteScore}</div>
        {editing ?
          (<CommentForm comment={comment} onChange={this.onChange} onSubmit={this.onSubmit} onClose={this.toggleForm} />)
          :
          (
            <div className="comment">
              <p className="author">Author: {comment.author}</p>
              <p className="body">{comment.body}</p>
              <button onClick={this.toggleForm}>Edit</button>
              <button onClick={this.deleteComment}>Delete</button>
            </div>
          )
        }
      </li>
    )
  }
}

const mapStateToProps = ({ comments }, ownProps) => {
  const { comment } = ownProps
  return {
    comment: comments['all'][comment.id] || null
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    scoreComment: (data) => dispatch(scoreComment(data)),
    editComment: (data) => dispatch(editComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comment)