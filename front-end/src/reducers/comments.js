import * as types from '../actions/types'

const initialState = {
  'byPost': [],
  'all': {}
}

export const comments = (state = initialState, action) => {
  const { comment } = action
  switch(action.type) {
    case types.FETCH_COMMENTS_RECEIVED:
      const { postId, comments } = action
      let namedComments = {}
      const postComents = comments || []
      postComents.forEach((comment) => {
        namedComments[comment.id] = comment
      })
      return {
        ...state,
        'byPost': {
          ...state['byPost'],
          [postId]: Object.keys(namedComments),
        },
        'all': {
          ...state['all'],
          ...namedComments
        }
      }
    case types.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        'byPost': {
          ...state['byPost'],
          [comment.parentId]: [
            ...state['byPost'][comment.parentId],
            comment.id
          ],
        },
        'all': {
          ...state['all'],
          [comment.id]: comment
        }
      }
    case types.EDIT_COMMENT_SUCCESS:
    case types.SCORE_COMMENT_SUCCESS:
      return {
        ...state,
        'all': {
          ...state['all'],
          [comment.id]: comment
        }
      }
    case types.DELETE_COMMENT_SUCCESS:
      const newState = {
        ...state,
        'byPost': {
          ...state['byPost'],
          [comment.parentId]:
            state['byPost'][comment.parentId].filter((commentId) => {
              return commentId !== comment.id
            })
        },
      }
      delete newState['all'][comment.id]
      return newState
    default:
      return state
  }
}