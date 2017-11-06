import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPosts } from '../../actions'
import api from '../../utils/api'
import PostList from '../posts/PostList'

class CategoryPage extends Component {
  constructor() {
    super()

    this.fetchPosts = this.fetchPosts.bind(this)
  }
  componentWillMount() {
    this.fetchPosts()
  }
  fetchPosts() {
    const { categoryId } = this.props.match.params
    api.fetchPosts(categoryId)
      .then((posts) => {
        const { fetchPosts } = this.props
        fetchPosts({ category: categoryId, posts })
      })
  }
  render() {
    const { category, posts } = this.props
    return (
      <div className='category'>
        <h1>{category}</h1>
        <ul>
          <li><Link to={`/post/new/${category}`}>Add Post</Link></li>
        </ul>
        {posts &&
          <PostList posts={posts} />
        }
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
)(CategoryPage)