import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CategoryList from './CategoryList'
import PostList from './posts/PostList'
import NewPostPage from './posts/NewPostPage'
import PostPage from './posts/PostPage'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' component={CategoryList} />
        <Route path='/category/:categoryId' component={PostList} />
        <Route path='/post/new/:categoryId' component={NewPostPage} />
        <Route path='/post/view/:postId' component={PostPage} />
      </div>
    )
  }
}

export default App