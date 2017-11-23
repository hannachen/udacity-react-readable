import React, { Component } from 'react'
import { connect } from 'react-redux'
import CategoryList from './categories/CategoryList'
import Posts from './posts/Posts'

class HomePage extends Component {

  shouldComponentUpdate(nextProps) {
    const { categories, posts } = this.props
    return nextProps.categories !== categories || nextProps.posts !== posts
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

export default connect(
  mapStateToProps,
)(HomePage)
