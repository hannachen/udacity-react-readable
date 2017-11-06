import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../actions'
import api from '../utils/api'

class Header extends Component {
  constructor(props, context) {
    super(props, context)

    this.getCategories()
  }
  getCategories() {
    const { getCategories } = this.props
    api.fetchCategories()
      .then(getCategories)
  }
  render() {
    return (
      <div>
        <Link to={`/`}>Category List</Link>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories: categories,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: (categories) => dispatch(fetchCategories(categories)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
