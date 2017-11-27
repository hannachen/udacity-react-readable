import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import HomeIcon from 'react-icons/lib/ti/home'

class Header extends Component {
  state = {
    homepage: false
  }
  constructor(props, context) {
    super(props, context)

    const { history } = this.props
    history.listen(() => {
      this.setState({
        homepage: this.isHomepage()
      })
    })
    this.state = {
      homepage: this.isHomepage()
    }
    this.isHomepage = this.isHomepage.bind(this)
    this.changeCategory = this.changeCategory.bind(this)
  }
  isHomepage() {
    const { history } = this.props
    return history.location && history.location.pathname === '/'
  }
  changeCategory(e) {
    const category = e.target.value
    const { history } = this.props
    history.push(`/${category}`)
  }

  render() {
    const { categories } = this.props
    const { homepage } = this.state

    return (
      <header>
        { homepage ? (
          <div className='homepage-header'>
            <h1 className="site-title">Browse categories and posts</h1>
            <Link to='/post/new' className="new-post-link">Add new post</Link>
          </div>
          )
          :
          (<div className='global-header'>
            <Link to={`/`} className="home-link">
              <HomeIcon size={24} />
              <span className="text">Back to home</span>
            </Link>
            {categories &&
              <select onChange={this.changeCategory} value=''>
                <option value=''>Jump to category</option>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={categories[category].path}>{categories[category].name}</option>
                ))}
              </select>
            }
          </div>)
        }
      </header>
    )
  }
}

const mapStateToProps = ({ categories }) => {
  return { categories }
}

export default connect(mapStateToProps)(withRouter(Header))