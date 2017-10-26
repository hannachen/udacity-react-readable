import api from '../utils/api'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_POSTS = 'FETCH_POSTS'
export const ADD_POST = 'ADD_POST'
export const GET_POST = 'GET_POST'
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
    type: FETCH_CATEGORIES,
    categories,
  }
}

// POSTS
export function fetchPosts(category) {
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
    type: FETCH_POSTS,
    category,
    posts,
  }
}
export function addPost(data) {
  return function(dispatch) {
    return api.addPost(data).then((response) => {
      const newPost = Object.assign({}, data, response);
      dispatch(addPostSuccess(newPost))
    }).catch(error => {
      throw(error)
    })
  }
}
export function addPostSuccess(newPost) {
  return {
    type: ADD_POST,
    newPost,
  }
}
export function fetchPost(id) {
  return function(dispatch) {
    return api.fetchPost(id).then((response) => {
      dispatch(fetchPostSuccess(response))
    }).catch(error => {
      throw(error)
    })
  }
}
export function fetchPostSuccess(post) {
  return {
    type: GET_POST,
    post,
  }
}
export function editPost(post) {
  return {
    type: EDIT_POST,
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