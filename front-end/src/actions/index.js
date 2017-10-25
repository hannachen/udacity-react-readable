import api from '../utils/api'

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const SCORE_COMMENT = 'SCORE_COMMENT'

// CATEGORIES
export function fetchCategories() {
  return function(dispatch) {
    return api.fetchCategories().then((categories) => {
      dispatch(fetchCategoriesSuccess(categories))
    }).catch(error => {
      throw(error)
    })
  }
}
export function fetchCategoriesSuccess(categories) {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    categories,
  }
}

// POSTS
export function fetchPosts(category) {
  console.log('fetchPosts', category)
  return function(dispatch) {
    return api.fetchPosts(category).then((posts) => {
      dispatch(fetchPostsSuccess({ category, posts }))
    }).catch(error => {
      throw(error)
    })
  }
}
export function fetchPostsSuccess({ category, posts }) {
  return {
    type: FETCH_POSTS_SUCCESS,
    category,
    posts,
  }
}
export function addPost({ user, category, post }) {
  return {
    type: ADD_POST,
    user,
    category,
    post,
  }
}
export function editPost({ user, post }) {
  return {
    type: EDIT_POST,
    user,
    post,
  }
}

// COMMENTS
export function addComment({ user, comment }) {
  return {
    type: ADD_COMMENT,
    user,
    comment,
  }
}

export function scoreComment({ user, comment, vote }) {
  return {
    type: SCORE_COMMENT,
    user,
    comment,
    vote,
  }
}