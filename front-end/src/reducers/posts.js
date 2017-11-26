import * as types from '../actions/types'

const initialState = {
  'byCategory': [],
  'all': {}
}

export const posts = (state = initialState, action) => {
  const { posts, post } = action
  let namedPosts = {}
  switch(action.type) {
    case types.FETCH_ALL_POSTS_RECEIVED:
      posts.forEach((post) => {
        namedPosts[post.id] = post
      })
      const categoryPosts = posts.reduce((allPosts = [], post) => {
        if (!allPosts[post.category]) {
          allPosts[post.category] = []
        }
        allPosts[post.category].push(post.id)
        return allPosts
      }, [])
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
    case types.FETCH_POSTS_RECEIVED:
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
    case types.FETCH_POST_RECEIVED:
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
    case types.ADD_POST_SUCCESS:
      const newPosts = state['byCategory'][post.category] || []
      return {
        ...state,
        'byCategory': {
          ...state['byCategory'],
          [post.category]: Array.from(new Set(newPosts.concat(post.id))),
        },
        'all': {
          ...state['all'],
          [post.id]: post
        }
      }
    case types.EDIT_POST_SUCCESS:
    case types.SCORE_POST_SUCCESS:
      return {
        ...state,
        'all': {
          ...state['all'],
          [post.id]: post
        }
      }
    case types.DELETE_POST_SUCCESS:
      const newState = {
        ...state,
        'byCategory': {
          [post.category]:
            state['byCategory'][post.category].filter((postId) => {
              return postId !== post.id
            })
        },
      }
      delete newState['all'][post.id]
      return newState
    default:
      return state
  }
}