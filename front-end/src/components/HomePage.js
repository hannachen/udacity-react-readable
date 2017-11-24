import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts } from '../actions'
import CategoryList from './categories/CategoryList'
import Posts from './posts/Posts'

class HomePage extends Component {
  componentDidMount() {
    const { fetchAllPosts } = this.props
    fetchAllPosts()
  }

  render() {
    const { categories, posts } = this.props

    return (
      <div className='home-page'>
        {categories ?
          <CategoryList categories={categories} />
          :
          <p>No categories available</p>
        }
        {posts.length ?
          <Posts posts={posts} />
          :
          <p>No posts yet!</p>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }) => {
  const categoriesWithPostCount = Object.keys(categories).reduce((result = {}, key) => {
    result[categories[key].path] = {
      ...categories[key],
      postCount: posts['byCategory'][key] ? posts['byCategory'][key].length : 0
    }
    return result
  }, {})

  return {
    categories: categoriesWithPostCount,
    posts: Object.keys(posts['all']).map((postId) => (posts['all'][postId])).filter((post) => (!post.deleted)) || null,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllPosts: () => dispatch(fetchAllPosts()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage)
