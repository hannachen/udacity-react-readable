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
          ...state['byCategory'],
          [category]: Object.keys(namedPosts),
        },
        'all': {
          ...state['all'],
          ...namedPosts
        }
      }
    case types.GET_POST:
      const { post } = action
      const categoryPosts = state['byCategory'][post.category] || []
      return {
        ...state,
        'byCategory': {
          ...state['byCategory'],
          [post.category]: categoryPosts.concat(post.id),
        },
        'all': {
          ...state['all'],
          [post.id]: post
        }
      }
    case types.ADD_POST:
    case types.EDIT_POST:
      const { newPost } = action
      const newPosts = state['byCategory'][newPost.category] || []
      return {
        ...state,
        'byCategory': {
          ...state['byCategory'],
          [newPost.category]: newPosts.concat(newPost.id),
        },
        'all': {
          ...state['all'],
          [newPost.id]: newPost
        }
      }
    default:
      return state
  }
}