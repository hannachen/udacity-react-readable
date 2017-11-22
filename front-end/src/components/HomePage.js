import React, { Component } from 'react'
import { connect } from 'react-redux'
import CategoryList from './categories/CategoryList'

class HomePage extends Component {

  render() {
    const { categories } = this.props

    return (
      <div className='home-page'>
        {categories &&
          <CategoryList />
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
