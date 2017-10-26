import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../actions'

class Header extends Component {
  constructor(props, context) {
    super(props, context)
    const { fetchCategories } = this.props
    fetchCategories()
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
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
