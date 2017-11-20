import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import uuid from 'uuid/v1'
import Nav from '../Nav'
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
  shouldComponentUpdate(nextProps, nextState) {
    const { posts } = this.props
    const { comment } = this.state
    return nextProps.posts !== posts || nextState !== comment
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
    const { categories, post } = this.props
    const { postId, comment, redirect } = this.state
    const { id, body, author, parentId } = comment
    const currentCategory = (categories && post && categories[post.category]) ? categories[post.category] : ''

    if (redirect) {
      return <Redirect to={`/post/view/${postId}`} />;
    }
    return (
      <div className='new-comment'>
        {currentCategory &&
          <Nav category={currentCategory} post={post} title='Adding a new comment' />
        }
        {post ?
          <div className='new-post'>
            <div className='post'>
              <p className='author'>By: {post.author}</p>
              <p>{post.body}</p>
            </div>
            <form className='comment-form'>
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
              <div className='field'>
                <label forhtml='input_author'>Author</label>
                <input
                  id='input_author'
                  className='post-input'
                  type='text'
                  name='author'
                  value={author || ''}
                  onChange={this.onChange}
                />
              </div>
              <div className='field'>
                <label forhtml='input_comment'>Comment</label>
                <textarea
                  id='input_comment'
                  className='post-input'
                  type='text'
                  name='body'
                  value={body || ''}
                  onChange={this.onChange}
                />
              </div>
              <button
                className='icon-btn'
                onClick={this.onSubmit}>
                Add Comment
              </button>
            </form>
          </div>
          :
          <p>Post not found.</p>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }, ownProps) => {
  const { postId } = ownProps.match.params
  const post = posts['all'][postId] || null
  return {
    categories,
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