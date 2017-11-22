import React, { Component } from 'react'
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
  }
  isHomepage() {
    const { history } = this.props
    return history.location && history.location.pathname === '/'
  }

  render() {
    const { homepage } = this.state
    return (
      <header>
        { homepage ? (<h1 className="site-title">Browse categories and posts</h1>)
          :
          (<Link to={`/`} className="home-link">
            <HomeIcon size={24} />
            <span className="text">Back to home</span>
          </Link>)
        }
      </header>
    )
  }
}

export default withRouter(Header)