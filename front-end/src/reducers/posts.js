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
          [post.category]: Array.from(new Set(categoryPosts.concat(post.id))),
        },
        'all': {
          ...state['all'],
          [post.id]: post
        }
      }
    case types.ADD_POST:
      const { newPost } = action
      const newPosts = state['byCategory'][newPost.category] || []
      return {
        ...state,
        'byCategory': {
          ...state['byCategory'],
          [newPost.category]: Array.from(new Set(newPosts.concat(newPost.id))),
        },
        'all': {
          ...state['all'],
          [newPost.id]: newPost
        }
      }
    case types.EDIT_POST:
      const { editPost } = action
      const editPosts = state['byCategory'][editPost.category] || []
      return {
        ...state,
        'byCategory': {
          ...state['byCategory'],
          [editPost.category]: Array.from(new Set(editPosts.concat(editPost.id))),
        },
        'all': {
          ...state['all'],
          [editPost.id]: editPost
        }
      }
    default:
      return state
  }
}