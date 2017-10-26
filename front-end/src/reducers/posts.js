import * as types from '../actions/index'

export const posts = (state = [], action) => {
  switch(action.type) {
    case types.FETCH_POSTS_SUCCESS:
      const { category, posts } = action
      return {
        ...state,
        [category]: posts
      }
    case types.ADD_POST:
      const { newPost } = action
      const categoryPosts = state[newPost.category] || []
      return {
        ...state,
        [newPost.category]: [
          ...categoryPosts,
          newPost
        ]
      }
    default:
      return state
  }
}