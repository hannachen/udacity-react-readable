import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CategoryList from './CategoryList'
import PostsList from './PostsList'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' component={CategoryList} />
        <Route path='/category/:categoryId' component={PostsList} />
      </div>
    )
  }
}

export default App