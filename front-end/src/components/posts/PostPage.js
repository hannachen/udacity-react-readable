import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPost, fetchComments } from '../../actions'
import api from '../../utils/api'
import CommentsList from '../comments/CommentList'
import './posts.css'

class PostPage extends Component {
  constructor(props, context) {
    super(props, context)
    this.fetchPost()
    this.fetchComments()
    this.fetchPost = this.fetchPost.bind(this)
    this.fetchComments = this.fetchComments.bind(this)
  }
  fetchPost() {
    const { postId } = this.props.match.params
    const { fetchPost } = this.props
    api.fetchPost(postId)
      .then(fetchPost)
  }
  fetchComments() {
    const { postId } = this.props.match.params
    api.fetchPostComments(postId)
      .then((comments) => {
        const { fetchComments } = this.props
        fetchComments({postId, comments})
      })
  }

  render() {
    const { post, comments } = this.props
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

        {comments &&
          <CommentsList post={post} comments={comments} />
        }
      </div>
    )
  }
}

const mapStateToProps = ({ posts, comments }, ownProps) => {
  const { postId } = ownProps.match.params
  const postComments = comments['byPost'][postId] || []
  return {
    post: posts['all'][postId] || null,
    comments: postComments.map((comment) => (comments['all'][comment])) || null
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (data) => dispatch(fetchPost(data)),
    fetchComments: (data) => dispatch(fetchComments(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostPage)