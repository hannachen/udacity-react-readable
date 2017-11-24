
// CATEGORIES
export function fetchCategories(categories) {
  return {
    type: FETCH_CATEGORIES,
    categories,
  }
}
import * as types from './types'

// POSTS
export function fetchAllPosts(posts) {
  return {
    type: FETCH_ALL_POSTS,
    posts: posts,
  }
}
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
export function editPost(post) {
  return {
    type: EDIT_POST,
    post,
  }
}
export function scorePost(post) {
  return {
    type: SCORE_POST,
    post,
  }
}
export function deletePost(post) {
  return {
    type: DELETE_POST,
    post,
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