import * as types from '../actions/index'

const initialState = {
  'byCategory': [],
  'all': {}
}

export const posts = (state = initialState, action) => {
  const { posts } = action
  let namedPosts = {}
  switch(action.type) {
    case types.FETCH_ALL_POSTS:
      posts.forEach((post) => {
        namedPosts[post.id] = post
      })
      const categoryPosts = posts.reduce((allPosts = [], post) => {
        if (!allPosts[post.category]) {
          allPosts[post.category] = []
        }
        allPosts[post.category].push(post.id)
        return allPosts
      }, {})
      return {
        ...state,
        'byCategory': {
          ...categoryPosts
        },
        'all': {
          ...state['all'],
          ...namedPosts
        }
      }
    case types.FETCH_POSTS:
      const { category } = action
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
      const byCategory = state['byCategory'][post.category] || []
      return {
        ...state,
        'byCategory': {
          ...state['byCategory'],
          [post.category]: Array.from(new Set(byCategory.concat(post.id))),
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