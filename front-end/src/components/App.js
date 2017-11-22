import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Header from './Header'
import HomePage from './HomePage'
import CategoryPage from './categories/CategoryPage'
import AddPostPage from './posts/AddPostPage'
import EditPostPage from './posts/EditPostPage'
import PostPage from './posts/PostPage'

class App extends Component {
  render() {

    return (
      <div className="app">

        <Header />

        <div className="contents">
          <Route exact path='/' component={HomePage} />
          <Route path='/category/:categoryId' component={CategoryPage} />
          <Route path='/post/new/:categoryId' component={AddPostPage} />
          <Route path='/post/edit/:postId' component={EditPostPage} />
          <Route path='/post/view/:postId' component={PostPage} />
        </div>
      </div>
    )
  }
}

export default App