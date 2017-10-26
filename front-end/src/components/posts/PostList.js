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
    if (!posts.length) {
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
          Object.keys(posts).map((postId) => {
            const post = posts[postId]
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
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { categoryId } = ownProps.match.params
  const categoryPosts = state.posts['byCategory'][categoryId] || []
  return {
    category: categoryId,
    posts: categoryPosts.map((post) => {
      return state.posts['all'][post] || []
    }),
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