import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPost } from '../../actions'
import './posts.css'

class NewPostPage extends Component {
  constructor(props, context) {
    super(props, context)
    this.fetchPost()
    this.fetchPost = this.fetchPost.bind(this)
  }
  fetchPost() {
    const { post, fetchPost } = this.props
    if (!post) {
      const { postId } = this.props.match.params
      fetchPost(postId)
    }
  }
  render() {
    const { post } = this.props
    if (!post) {
      return (
        <div>Post not found</div>
      )
    }
    return (
      <div className='post'>
        <Link to={`/post/edit/${post.id}`}>
          Edit Post
        </Link>
        <h4>{post.title}</h4>
        <p>{post.commentCount} comments</p>
        <p>{post.author}</p>
        <p>{post.body}</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps.match.params
  return {
    post: state.posts['all'][postId] || null
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (data) => dispatch(fetchPost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewPostPage)