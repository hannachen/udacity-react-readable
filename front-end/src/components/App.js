import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import HomePage from './HomePage'
import CategoryPage from './categories/CategoryPage'
import AddPostPage from './posts/AddPostPage'
import EditPostPage from './posts/EditPostPage'
import PostPage from './posts/PostPage'

export default function App () {
  return (
    <div className="app">

      <Header />

      <div className="contents">
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/newPost/:categoryId?' component={AddPostPage} />
          <Route path='/editPost/:postId' component={EditPostPage} />
          <Route exact path='/:categoryId' component={CategoryPage} />
          <Route exact path='/:categoryId/:postId' component={PostPage} />
        </Switch>
      </div>
    </div>
  )
}
