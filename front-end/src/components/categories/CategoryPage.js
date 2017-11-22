import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../../actions'
import api from '../../utils/api'
import Posts from '../posts/Posts'

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
    posts: categoryPosts.map((post) => {
      return posts['all'][post] || null
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