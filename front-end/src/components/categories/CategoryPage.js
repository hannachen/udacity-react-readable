import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../../actions'
import api from '../../utils/api'
import PostList from '../posts/PostList'
import SortBy from '../SortBy'
import Nav from '../Nav'

class CategoryPage extends Component {
  state = {
    order: 'desc',
    orderBy: 'voteScore',
  }
  constructor() {
    super()

    this.fetchPosts = this.fetchPosts.bind(this)
    this.onSort = this.onSort.bind(this)
    this.sortPosts = this.sortPosts.bind(this)
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
  onSort(e) {
    const { order, orderBy } = this.state
    const sortField = e.target.value
    const sortOrder = (order === 'desc' && sortField === orderBy) ? 'asc' : 'desc' // Toggle or use default sort order of 'desc'
    this.setState({
      order: sortOrder,
      orderBy: sortField
    })
  }
  sortPosts() {
    const { posts } = this.props
    const { order, orderBy } = this.state

    const sortedPosts = posts.sort((a, b) => {
      return b[orderBy] - a[orderBy]
    })

    if (order === 'asc') {
      sortedPosts.reverse()
    }

    return sortedPosts
  }

  render() {
    const { category, posts } = this.props
    const { order, orderBy } = this.state
    const sortedPosts = posts ? this.sortPosts() : null

    return (
      <div className='category-page'>
        {category &&
          <Nav category={category} />
        }
        {posts &&
          <div>
            <SortBy
              title='Sort posts'
              fields={['voteScore', 'timestamp', 'commentCount']}
              order={order}
              orderBy={orderBy}
              onSort={this.onSort}
            />
            <PostList posts={sortedPosts} />
          </div>
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
      return posts['all'][post] || []
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