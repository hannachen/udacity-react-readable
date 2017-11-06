import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class PostLink extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { post } = this.props
    return (
      <li key={post.id}>
        <h4>
          <Link to={`/post/view/${post.id}`}>{post.title}</Link>
        </h4>
        <p>{post.commentCount} comments</p>
        <p>{post.author}</p>
        <p>{post.body}</p>
      </li>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostLink)