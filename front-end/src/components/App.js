import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CategoryList from './CategoryList'
import PostList from './posts/PostList'
import EditPostPage from './posts/EditPostPage'
import PostPage from './posts/PostPage'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' component={CategoryList} />
        <Route path='/category/:categoryId' component={PostList} />
        <Route path='/post/new/:categoryId' render={({ match }) => {
          const { categoryId } = match.params
          const post = { category: categoryId }
          return (
            <EditPostPage post={post} />
          )
        }}/>
        <Route path='/post/edit/:postId' render={({ match }) => {
          const { postId } = match.params
          const post = { id: postId }
          return (
            <EditPostPage post={post} />
          )
        }}/>
        <Route path='/post/view/:postId' component={PostPage} />
      </div>
    )
  }
}

export default App