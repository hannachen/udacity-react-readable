import * as types from './types'

// POSTS
export function fetchAllPosts() {
  return {
    type: types.FETCH_ALL_POSTS
  }
}
export function fetchPosts(category) {
  return {
    type: types.FETCH_POSTS,
    category
  }
}
export function fetchPost(postId) {
  return {
    type: types.FETCH_POST,
    postId,
  }
}
export function addPost(post) {
  return {
    type: types.ADD_POST,
    post,
  }
}
export function editPost(post) {
  return {
    type: types.EDIT_POST,
    post,
  }
}
export function scorePost({ postId, vote }) {
  return {
    type: types.SCORE_POST,
    postId,
    vote
  }
}
export function deletePost(post) {
  return {
    type: types.DELETE_POST,
    post,
  }
}

// COMMENTS
export function fetchComments(postId) {
  return {
    type: types.FETCH_COMMENTS,
    postId,
  }
}
export function addComment(comment) {
  return {
    type: types.ADD_COMMENT,
    comment,
  }
}
export function editComment(comment) {
  return {
    type: types.EDIT_COMMENT,
    comment,
  }
}
export function deleteComment(comment) {
  return {
    type: types.DELETE_COMMENT,
    comment,
  }
}
export function scoreComment({commentId, vote}) {
  return {
    type: types.SCORE_COMMENT,
    commentId,
    vote
  }
}