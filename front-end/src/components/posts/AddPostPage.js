import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import uuid from 'uuid/v1'
import { addPost } from '../../actions'
import Nav from '../Nav'
import PostForm from './PostForm'
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
  shouldComponentUpdate(nextProps, nextState) {
    const { categories } = this.props
    const { post } = this.state
    return nextProps.categories !== categories || nextState !== post
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

    const timestamp = { timestamp: Date.now() }
    const data = Object.assign({}, post, timestamp)

    api.addPost(data)
      .then(newPost)
      .then(() => {
        this.setState({ redirect: true })
      })
  }

  render() {
    const { categories } = this.props
    const { post, redirect } = this.state
    const { id, category } = post
    const currentCategory = categories[category]

    if (redirect) {
      return <Redirect to={`/post/view/${id}`} />;
    }
    return (
      <div className='add-post'>
        {currentCategory &&
          <Nav category={currentCategory} title='Adding a new post' />
        }
        <div className='new-post'>
          <PostForm post={post} submitCta='Add Post' onChange={this.onChange} onSubmit={this.onSubmit} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories
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
)(AddPostPage)