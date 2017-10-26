import * as types from '../actions/index'

const initialState = {
  'byCategory': [],
  'all': {}
}

export const posts = (state = initialState, action) => {
  switch(action.type) {
    case types.FETCH_POSTS:
      const { category, posts } = action
      let namedPosts = {}
      posts.forEach((post) => {
        namedPosts[post.id] = post
      })
      return {
        ...state,
        'byCategory': {
          [category]: Object.keys(namedPosts),
        },
        'all': {
          ...namedPosts
        }
      }
    case types.GET_POST:
      const { post } = action
      const categoryPosts = state[post.category] || []
      return {
        ...state,
        'byCategory': {
          [post.category]: categoryPosts.concat(post.id),
        },
        'all': {
          ...state[post.category],
          [post.id]: post
        }
      }
    case types.ADD_POST:
      const { newPost } = action
      return {
        ...state,
        'byCategory': {
          [newPost.category]: Object.keys(newPost),
        },
        'all': {
          ...state[newPost.category],
          [newPost.id]: newPost
        }
      }
    default:
      return state
  }
}