import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost } from '../../actions'
import api from '../../utils/api'
import Nav from '../Nav'
import CommentsList from '../comments/CommentList'

class PostPage extends Component {
  constructor(props, context) {
    super(props, context)
    this.fetchPost()
    this.fetchPost = this.fetchPost.bind(this)
  }
  fetchPost() {
    const { postId } = this.props.match.params
    const { fetchPost } = this.props
    api.fetchPost(postId)
      .then(fetchPost)
  }

  render() {
    const { category, post } = this.props
    if (!post) {
      return (
        <div>Post not found</div>
      )
    }
    return (
      <div className='post-page'>
        <Nav category={category} post={post} />
        <div className='post'>
          <p className='author'>By: {post.author}</p>
          <p>{post.body}</p>
        </div>

        <CommentsList post={post} />
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }, ownProps) => {
  const { postId } = ownProps.match.params
  const post = posts['all'][postId] || null
  const category = post && post.category ? categories[post.category] : null
  return {
    category,
    post,
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
)(PostPage)