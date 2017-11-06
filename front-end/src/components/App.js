import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CategoryList from './categories/CategoryList'
import CategoryPage from './categories/CategoryPage'
import AddPostPage from './posts/AddPostPage'
import EditPostPage from './posts/EditPostPage'
import PostPage from './posts/PostPage'
import AddCommentPage from './comments/AddCommentPage'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' component={CategoryList} />
        <Route path='/category/:categoryId' component={CategoryPage} />
        <Route path='/post/new/:categoryId' component={AddPostPage} />
        <Route path='/post/edit/:postId' component={EditPostPage} />
        <Route path='/post/view/:postId' component={PostPage} />
        <Route path='/comment/new/:postId' component={AddCommentPage} />
      </div>
    )
  }
}

export default App