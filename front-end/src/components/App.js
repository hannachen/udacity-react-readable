import React from 'react'
import { Route } from 'react-router-dom'
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
        <Route exact path='/' component={HomePage} />
        <Route exact path='/:categoryId' component={CategoryPage} />
        <Route exact path='/:categoryId/:postId' component={PostPage} />
        <Route path='/post/new/:categoryId?' component={AddPostPage} />
        <Route path='/post/edit/:postId' component={EditPostPage} />
      </div>
    </div>
  )
}
