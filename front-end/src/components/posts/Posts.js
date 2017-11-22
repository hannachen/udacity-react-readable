import React, { Component } from 'react'
import SortBy from '../SortBy'
import Nav from '../Nav'
import PostList from './PostList'

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