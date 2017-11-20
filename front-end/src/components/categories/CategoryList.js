import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './categories.css'

class CategoryList extends Component {
  shouldComponentUpdate(nextProps) {
    const { categories, posts } = this.props
    return nextProps.categories !== categories || nextProps.posts !== posts
  }
  render() {
    const { categories, posts } = this.props
    if (!categories || categories.length === 0) {
      return (
        <p>No categories available</p>
      )
    }
    return (
      <ul className='category-list'>
        {categories && posts && Object.keys(categories).map((category) => (
          <li key={categories[category].path}>
            <Link className='item-link' to={`/category/${categories[category].path}`}>
              <h3>{categories[category].name}</h3>
              <div className='posts'>
                <span>
                  {posts['byCategory'][category] ?
                    `${posts['byCategory'][category].length} posts` : `No posts`
                  }
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
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
)(CategoryList)
