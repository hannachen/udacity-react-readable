import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPost, editPost } from '../../actions'
import api from '../../utils/api'
import PostForm from './PostForm'
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
    const { post, redirect } = this.state

    if (redirect) {
      return <Redirect to={`/category/${post.category}`} />
    }
    return (
      <div className='post'>
        {post &&
          <PostForm post={post} onChange={this.onChange} onSubmit={this.onSubmit} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps.match.params
  const post = state.posts['all'][postId] || null
  return {
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