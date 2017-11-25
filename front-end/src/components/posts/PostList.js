import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { scorePost, deletePost } from '../../actions'
import SortBy from '../SortBy'
import Nav from '../Nav'
import PostListItem from './PostListItem'
import ArrowIcon from 'react-icons/lib/md/reply'
import './posts.css'

class PostList extends Component {
  state = {
    order: 'desc',
    orderBy: 'voteScore',
    redirect: false,
    redirectCategory: null,
  }
  constructor() {
    super()

    this.onSort = this.onSort.bind(this)
    this.sortPosts = this.sortPosts.bind(this)
    this.scorePost = this.scorePost.bind(this)
    this.deletePost = this.deletePost.bind(this)
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
  scorePost({ postId, vote }) {
    const { scorePost } = this.props
    scorePost({ postId, vote })
  }
  deletePost(post) {
    const { category, deletePost } = this.props
    deletePost(post)
      .then(() => {
        this.setState(() => ({
          redirect: (category && category.path),
          redirectCategory: post.category
        }))
      })
  }

  render() {
    const { category, posts, scorePost } = this.props
    const { order, orderBy, redirect, redirectCategory } = this.state
    const sortedPosts = posts ? this.sortPosts() : null

    if (redirect && redirectCategory) {
      return <Redirect to={`/category/${redirectCategory}`} />
    }

    return (
      <div className='posts-page'>
        {category &&
          <Nav category={category} />
        }
        {posts.length ?
          <div className='post'>
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
            <ul className='post-list'>
              {sortedPosts.map((post) => (
                <PostListItem
                  key={post.id}
                  post={post}
                  scorePost={scorePost}
                  deletePost={this.deletePost}
                />
              ))}
            </ul>
          </div>
          :
          <p className='no-posts'>
            No posts yet. Add one now!
            <ArrowIcon size={32} />
          </p>
        }
      </div>
    )
  }
}

export default connect(null, { scorePost, deletePost })(PostList)
