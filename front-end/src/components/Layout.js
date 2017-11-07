import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import Header from './Header'

class Layout extends Component {
  state = {
    location: null
  }
  constructor(props, context) {
    super(props, context)

    const { location, history } = this.props
    this.state = {
      location: location
    }
    history.listen((location) => {
      this.setState({ location })
    })
  }

  render() {
    const { location } = this.state
    return (
      <div className="layout">
        <Header location={location} />
        {this.props.children}
      </div>
    )
  }
}

export default withRouter(Layout)