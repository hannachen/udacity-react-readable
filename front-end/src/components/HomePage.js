import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts } from '../actions'
import CategoryList from './categories/CategoryList'
import PostList from './posts/PostList'

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
          <PostList posts={posts} />
          :
          <p>No posts available</p>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }) => {
  return {
    categories,
    posts: Object.keys(posts['all']).map((postId) => (posts['all'][postId])) || [],
  }
}
export default connect(mapStateToProps, { fetchAllPosts })(HomePage)
