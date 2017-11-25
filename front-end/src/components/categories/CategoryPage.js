import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../../actions'
import PostList from '../posts/PostList'

class CategoryPage extends Component {
  componentDidMount() {
    const { categoryId } = this.props.match.params
    const { fetchPosts } = this.props
    fetchPosts(categoryId)
  }

  render() {
    const { category, posts } = this.props

    return (
      <div className='category-page'>
        <PostList category={category} posts={posts} />
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }, ownProps) => {
  const { categoryId } = ownProps.match.params
  const categoryPosts = posts['byCategory'][categoryId] || []
  return {
    category: categories[categoryId],
    posts: categoryPosts.map((postId) => (posts['all'][postId])).filter((post) => (!post.deleted)) || [],
  }
}
export default connect(mapStateToProps, { fetchPosts })(CategoryPage)