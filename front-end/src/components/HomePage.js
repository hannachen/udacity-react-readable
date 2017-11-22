import React, { Component } from 'react'
import { connect } from 'react-redux'
import CategoryList from './categories/CategoryList'

class HomePage extends Component {

  render() {
    const { categories, posts } = this.props

    return (
      <div className='home-page'>
        {categories && posts ?
          <CategoryList categories={categories} posts={posts} />
          :
          <p>No categories available</p>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }) => {
  return {
    categories,
    posts
  }
}

export default connect(
  mapStateToProps,
)(HomePage)
