import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import uuid from 'uuid/v1'
import { addPost } from '../../actions'
import api from '../../utils/api'
import './posts.css'

class AddPostPage extends Component {
  state = {
    post: {
      id: '',
      title: '',
      body: '',
      author: '',
      category: '',
    },
    redirect: false
  }
  constructor(props, context) {
    super(props, context)

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    // Set default states
    const { categoryId } = this.props.match.params
    const id = uuid()
    this.state = {
      ...this.state,
      post: {
        ...this.state.post,
        category: categoryId,
        id
      }
    }
  }
  onChange(e) {
    const { post } = this.state
    post[e.target.name] = e.target.value
    this.setState({ post })
  }
  onSubmit(e) {
    e.preventDefault()

    const { newPost } = this.props
    const { post } = this.state
    const timestamp = Math.floor(Date.now() / 1000)
    const data = {
      post,
      timestamp
    }

    api.addPost(data)
      .then(newPost)
      .then(() => {
        this.setState({ redirect: true })
      })
  }

  render() {
    const { post, redirect } = this.state
    const { id, title, body, author, category } = post

    if (redirect) {
      return <Redirect to={`/category/${category}`} />;
    }
    return (
      <div className='post'>
        <h1 className="title">Add a post to category: <strong>{category}</strong></h1>
        <div className='new-post'>
          <input
            type='hidden'
            name='id'
            defaultValue={id}
          />
          <input
            type='hidden'
            name='category'
            defaultValue={category}
          />
          <input
            className='post-input'
            type='text'
            placeholder='Author'
            name='author'
            value={author || ''}
            onChange={this.onChange}
          />
          <input
            className='post-input'
            type='text'
            placeholder='Title'
            name='title'
            value={title || ''}
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
            Add Post
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    newPost: (data) => dispatch(addPost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPostPage)