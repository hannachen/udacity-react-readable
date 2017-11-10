import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import uuid from 'uuid/v1'
import { addComment } from '../../actions'
import api from '../../utils/api'

class AddCommentPage extends Component {
  state = {
    postId: null,
    comment: {
      id: '',
      timestamp: null,
      body: '',
      author: '',
      parentId: '',
    },
    redirect: false
  }
  constructor(props, context) {
    super(props, context)

    // Set default states
    const { postId } = this.props.match.params
    const id = uuid()
    this.state = {
      ...this.state,
      postId,
      comment: {
        ...this.state.comment,
        parentId: postId,
        id
      }
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(e) {
    const { comment } = this.state
    comment[e.target.name] = e.target.value
    this.setState({ comment })
  }
  onSubmit(e) {
    e.preventDefault()

    const timestamp = Date.now()
    const { comment } = this.state
    const data = {
      ...comment,
      timestamp
    }

    const { newComment } = this.props
    api.addComment(data)
      .then(newComment)
      .then(() => {
        this.setState({ redirect: true })
      })
  }

  render() {
    const { postId, comment, redirect } = this.state
    const { id, body, author, parentId } = comment

    if (redirect) {
      return <Redirect to={`/post/view/${postId}`} />;
    }
    return (
      <div className='post'>
        <h1 className="title">Add a post to <strong>{postId}</strong></h1>
        <div className='new-post'>
          <input
            type='hidden'
            name='id'
            defaultValue={id}
          />
          <input
            type='hidden'
            name='parentId'
            defaultValue={parentId}
          />
          <input
            className='post-input'
            type='text'
            placeholder='Author'
            name='author'
            value={author || ''}
            onChange={this.onChange}
          />
          <textarea
            className='post-input'
            type='text'
            placeholder='Body'
            name='body'
            value={body || ''}
            onChange={this.onChange}
          />
          <button
            className='icon-btn'
            onClick={this.onSubmit}>
            Add Comment
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps
  const post = state.posts['all'][postId] || null
  return {
    post
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    newComment: (data) => dispatch(addComment(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCommentPage)