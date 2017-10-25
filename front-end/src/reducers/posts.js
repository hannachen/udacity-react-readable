import * as types from '../actions/index'

export const posts = (state = [], action) => {
  switch(action.type) {
    case types.FETCH_POSTS_SUCCESS:
      const { category, posts } = action
      return {
        ...state,
        [category]: posts
      }
    default:
      return state
  }
}