import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../../actions'
import Posts from '../posts/Posts'

class CategoryPage extends Component {
  constructor() {
    super()

    this.fetchPosts = this.fetchPosts.bind(this)
  }
  componentDidMount() {
    this.fetchPosts()
  }
  fetchPosts() {
    const { categoryId } = this.props.match.params
    const { fetchPosts } = this.props
    fetchPosts(categoryId)
  }

  render() {
    const { category, posts } = this.props

    return (
      <div className='category-page'>
        {category && posts &&
          <Posts category={category} posts={posts} />
        }
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }, ownProps) => {
  const { categoryId } = ownProps.match.params
  const categoryPosts = posts['byCategory'][categoryId] || []
  return {
    category: categories[categoryId],
    posts: categoryPosts.map((postId) => (posts['all'][postId])).filter((post) => (!post.deleted)) || null,
  }
}
export default connect(mapStateToProps, { fetchPosts })(CategoryPage)