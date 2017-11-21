import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPost, editPost } from '../../actions'
import Nav from '../Nav'
import PostForm from './PostForm'
import api from '../../utils/api'
import './posts.css'

class EditPostPage extends Component {
  state = {
    postId: null,
    post: null,
    redirect: false
  }
  constructor(props, context) {
    super(props, context)

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    // Initial states
    const { post } = this.props
    const { postId } = this.props.match.params
    this.state = {
      ...this.state,
      postId,
      post,
    }
  }
  componentWillMount() {
    const { postId, post } = this.state
    if (!post) {
      const { fetchPost } = this.props
      api.fetchPost(postId)
        .then(fetchPost)
        .then((res) => {
          this.setState({ post: res.post })
        })
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
  onChange(e) {
    const { post } = this.state
    post[e.target.name] = e.target.value
    this.setState({ post })
  }
  onSubmit(e) {
    e.preventDefault()

    const { post } = this.state
    const { editPost } = this.props
    api.editPost(post)
      .then(editPost)
      .then(() => {
        this.setState({ redirect: true })
      })
  }

  render() {
    const { categories } = this.props
    const { post, redirect } = this.state
    const currentCategory = (post && post.category && categories) ? categories[post.category] : null

    if (redirect) {
      return <Redirect to={`/post/view/${post.id}`} />;
    }
    return (
      <div className='edit-post'>
        {currentCategory &&
          <Nav category={currentCategory} title='Editing post' />
        }
        {post &&
          <PostForm post={post} submitCta='Edit Post' onChange={this.onChange} onSubmit={this.onSubmit} readOnly={['author']} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps.match.params
  const post = state.posts['all'][postId] || null
  const { categories } = state
  return {
    categories,
    post
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (data) => dispatch(fetchPost(data)),
    editPost: (data) => dispatch(editPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPostPage)