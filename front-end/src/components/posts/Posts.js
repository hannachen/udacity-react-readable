import React, { Component } from 'react'
import SortBy from '../SortBy'
import Nav from '../Nav'
import PostList from './PostList'
import './posts.css'

class Posts extends Component {
  state = {
    order: 'desc',
    orderBy: 'voteScore',
  }
  constructor() {
    super()

    this.onSort = this.onSort.bind(this)
    this.sortPosts = this.sortPosts.bind(this)
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
      <div className='posts-page'>
        {category &&
          <Nav category={category} />
        }
        {posts && posts.length > 0 &&
          <div className='posts-header'>
            <h2>Posts</h2>
            <SortBy
              title='Sort posts'
              fields={['voteScore', 'timestamp', 'commentCount']}
              order={order}
              orderBy={orderBy}
              onSort={this.onSort}
              disabled={(posts.length <= 1)}
            />
          </div>
        }
        <PostList posts={sortedPosts} />
      </div>
    )
  }
}

export default Posts