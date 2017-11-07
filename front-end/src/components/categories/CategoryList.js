import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class CategoryList extends Component {
  render() {
    const { categories } = this.props
    if (!categories || categories.length === 0) {
      return (
        <p>No categories available</p>
      )
    }
    return (
      <ul className='category-list'>
        {categories && Object.keys(categories).map((category) => (
          <li key={categories[category].path}>
            <Link to={`/category/${categories[category].path}`}>
              <h3>{categories[category].name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories,
  }
}

export default connect(
  mapStateToProps,
)(CategoryList)
