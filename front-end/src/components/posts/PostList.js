import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../../actions'
import { Link } from 'react-router-dom'

class PostList extends Component {
  constructor() {
    super()

    this.fetchPosts = this.fetchPosts.bind(this)
  }
  componentWillMount() {
    const { posts } = this.props

    /**
     * Fetch posts from API -- this doesn't really work with persisted data,
     * should always fetch posts on load to check for new posts by other users
     */
    if (!posts) {
      this.fetchPosts()
    }
  }
  fetchPosts() {
    const { fetchPosts } = this.props
    const { categoryId } = this.props.match.params
    fetchPosts(categoryId)
  }
  render() {
    const { category, posts } = this.props
    return (
      <div className='category'>
        <h1>{category}</h1>
        <ul>
          <li><Link to={`/post/new/${category}`}>Add Post</Link></li>
        </ul>
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
)(PostList)