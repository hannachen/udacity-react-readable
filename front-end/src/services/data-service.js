import * as types from '../actions/types'
import api from '../utils/api'

const dataService = store => next => action => {
  // Pass all actions through by default
  next(action)
  switch (action.type) {
    case types.FETCH_ALL_POSTS:
      api.fetchAllPosts()
        .then((posts) => {
          next({
            type: types.FETCH_ALL_POSTS_RECEIVED,
            posts
          })
        })
        .catch((err) => {
          return next({
            type: types.FETCH_ALL_POSTS_ERROR,
            err
          })
        })
      break
    case types.FETCH_CATEGORIES:
      api.fetchCategories()
        .then((data) => {
          next({
            type: types.FETCH_CATEGORIES_RECEIVED,
            categories: data.categories
          })
        })
        .catch((err) => {
          return next({
            type: types.FETCH_CATEGORIES_ERROR,
            err
          })
        })
      break
    case types.FETCH_POSTS:
      const { category } = action
      api.fetchPosts(category)
        .then((posts) => {
          next({
            type: types.FETCH_POSTS_RECEIVED,
            posts,
            category
          })
        })
        .catch((err) => {
          return next({
            type: types.FETCH_POSTS_ERROR,
            err
          })
        })
      break
    case types.FETCH_POST:
      return api.fetchPost(action.postId)
        .then((post) => {
          next({
            type: types.FETCH_POST_RECEIVED,
            post
          })
          return post
        })
        .catch((err) => {
          return next({
            type: types.FETCH_POST_ERROR,
            err
          })
        })
    case types.ADD_POST:
      return api.addPost(action.post)
        .then((post) => {
          next({
            type: types.ADD_POST_SUCCESS,
            post,
          })
        })
    case types.EDIT_POST:
      return api.editPost(action.post)
        .then((post) => {
          next({
            type: types.EDIT_POST_SUCCESS,
            post,
          })
        })
    case types.SCORE_POST:
      return api.scorePost(action.postId, action.vote)
        .then((post) => {
          next({
            type: types.SCORE_POST_SUCCESS,
            post,
          })
          return post
        })
    case types.DELETE_POST:
      return api.deletePost(action.post.id)
        .then((post) => {
          console.log('ready for next state...', post)
          next({
            type: types.DELETE_POST_SUCCESS,
            post,
          })
          return post
        })
    case types.FETCH_COMMENTS:
      api.fetchPostComments(action.postId)
        .then((data) => {
          next({
            type: types.FETCH_COMMENTS_RECEIVED,
            postId: action.postId,
            comments: data,
          })
        })
        .catch((err) => {
          return next({
            type: types.FETCH_COMMENTS_ERROR,
            err
          })
        })
      break
    case types.ADD_COMMENT:
      return api.addComment(action.comment)
        .then((comment) => {
          next({
            type: types.ADD_COMMENT_SUCCESS,
            comment,
          })
        })
    case types.EDIT_COMMENT:
      return api.editComment(action.comment)
        .then((comment) => {
          next({
            type: types.EDIT_COMMENT_SUCCESS,
            comment,
          })
        })
    case types.SCORE_COMMENT:
      return api.scoreComment(action.commentId, action.vote)
        .then((comment) => {
          next({
            type: types.SCORE_COMMENT_SUCCESS,
            comment,
          })
          return comment
        })
    case types.DELETE_COMMENT:
      const { comment } = action
      api.deleteComment(comment.id)
        .then(() => {
          next({
            type: types.DELETE_COMMENT_SUCCESS,
            comment,
          })
        })
      break
    default:
      break
  }

}

export default dataService