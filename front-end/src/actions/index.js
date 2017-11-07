export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_POSTS = 'FETCH_POSTS'
export const ADD_POST = 'ADD_POST'
export const GET_POST = 'GET_POST'
export const EDIT_POST = 'EDIT_POST'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const SCORE_COMMENT = 'SCORE_COMMENT'

// CATEGORIES
export function fetchCategories(categories) {
  return {
    type: FETCH_CATEGORIES,
    categories,
  }
}

// POSTS
export function fetchPosts({ category, posts }) {
  return {
    type: FETCH_POSTS,
    category,
    posts,
  }
}
export function addPost(newPost) {
  return {
    type: ADD_POST,
    newPost,
  }
}
export function fetchPost(post) {
  return {
    type: GET_POST,
    post,
  }
}
export function editPost(editPost) {
  return {
    type: EDIT_POST,
    editPost,
  }
}

// COMMENTS
export function fetchComments({ postId, comments }) {
  return {
    type: FETCH_COMMENTS,
    postId,
    comments,
  }
}
export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}
export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment,
  }
}
export function deleteComment(comment) {
  return {
    type: DELETE_COMMENT,
    comment,
  }
}
export function scoreComment(comment) {
  return {
    type: SCORE_COMMENT,
    comment,
  }
}