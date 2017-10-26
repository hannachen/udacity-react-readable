import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import uuid from 'uuid/v1'
import { addPost } from '../../actions'
import './posts.css'

class NewPostPage extends Component {
  state = {
    id: null,
    title: null,
    body: null,
    author: null,
    category: null,
    redirect: false
  }
  constructor() {
    super()

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  componentWillMount() {
    const id = uuid()
    const { categoryId } = this.props.match.params
    this.setState({
      id,
      category: categoryId,
    })
  }
  onChange(e) {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }
  onSubmit(e) {
    e.preventDefault()

    const { newPost } = this.props
    const timestamp = Math.floor(Date.now() / 1000)
    const data = {
      ...this.state,
      timestamp
    }
    delete data.redirect

    newPost(data)
      .then(() => {
        this.setState({ redirect: true })
      })
  }

  render() {
    const { id, title, body, author, category, redirect } = this.state
    if (redirect) {
      return <Redirect to={`/category/${category}`} />;
    }
    return (
      <div className='post'>
        <h1 className="title">Add a post to <strong>{category}</strong></h1>
        <div className='new-post'>
          <input
            type='hidden'
            name='id'
            value={id}
          />
          <input
            type='hidden'
            name='category'
            value={category}
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

const mapStateToProps = ({ posts }) => {
  return {
    response: posts,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    newPost: (data) => dispatch(addPost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewPostPage)