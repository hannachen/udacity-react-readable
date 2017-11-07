import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../actions'
import api from '../utils/api'
import HomeIcon from 'react-icons/lib/ti/home'

class Header extends Component {
  state = {
    homepage: false
  }
  constructor(props, context) {
    super(props, context)

    this.getCategories()
  }
  componentWillReceiveProps(nextProps) {
    const { location } = nextProps
    this.setState({
      homepage: location.pathname === '/'
    })
  }
  getCategories() {
    const { getCategories } = this.props
    api.fetchCategories()
      .then(getCategories)
  }

  render() {
    const { homepage } = this.state
    return (
      <header>
        { homepage ? (<h1 className="site-title">Browse Categories</h1>)
          :
          (<Link to={`/`} className="home-link">
            <HomeIcon size={24} />
            <span className="text">Back to category list</span>
          </Link>)
        }
      </header>
    )
  }
}

const mapStateToProps = ({ categories, path }) => {
  return {
    categories: categories,
    path: path
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
