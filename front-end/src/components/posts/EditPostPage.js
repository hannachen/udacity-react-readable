import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import uuid from 'uuid/v1'
import { fetchPost, addPost, editPost } from '../../actions'
import './posts.css'

class EditPostPage extends Component {
  state = {
    post: {
      id: '',
      title: '',
      body: '',
      author: '',
      category: '',
    },
    edit: false,
    redirect: false
  }
  constructor(props, context) {
    super(props, context)

    this.editPost = this.editPost.bind(this)
    this.addPost = this.addPost.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)

    const { post } = this.state
    const postProps = this.props.post

    this.state = {
      ...this.state,
      post: Object.assign({}, post, postProps)
    }

  }
  componentWillReceiveProps(nextProps) {
    const { post } = nextProps
    if (this.state.post !== post) {
      this.setState({
        post
      })
    }
  }
  componentWillMount() {
    const postProps = this.props.post
    const editPostId = postProps.id
    const edit = (editPostId && editPostId !== '') ? true : false
    if (edit) {
      this.editPost(editPostId)
    } else {
      this.addPost()
    }
  }
  editPost(id) {
    const { fetchPost } = this.props
    fetchPost(id)
  }
  addPost() {
    const id = uuid()
    this.setState({
      post: { id }
    })
  }
  onChange(e) {
    const { post } = this.state
    post[e.target.name] = e.target.value
    this.setState({ post })
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
    const { post, edit, redirect } = this.state
    const { id, title, body, author, category } = post

    console.log('111', post)

    if (redirect) {
      return <Redirect to={`/category/${category}`} />;
    }
    return (
      <div className='post'>
        <h1 className="title">
          {edit && (<span>Add a post to </span>)}
          <strong>{category}</strong>
        </h1>
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

const mapStateToProps = (state, ownProps) => {
  const { id, category } = ownProps.post
  const post = state.posts['all'][id] || { category }
  return {
    post
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (data) => dispatch(fetchPost(data)),
    newPost: (data) => dispatch(addPost(data)),
    editPost: (data) => dispatch(editPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPostPage)