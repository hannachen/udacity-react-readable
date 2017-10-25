import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'

class PostsList extends Component {
  componentWillMount() {
    const { fetchPosts } = this.props
    const { categoryId } = this.props.match.params
    fetchPosts(categoryId)
  }
  render() {
    const { category, posts } = this.props
    return (
      <div className='category'>
        <h1>{category}</h1>
        <ul className='post-list'>
          {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.author}</p>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { categoryId } = ownProps.match.params
  return {
    category: categoryId,
    posts: state.posts[categoryId],
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (data) => dispatch(fetchPosts(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsList)