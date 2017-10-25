import * as types from '../actions/index'

export const categories = (state = [], action) => {
  switch(action.type) {
    case types.FETCH_CATEGORIES_SUCCESS:
      const { categories } = action
      return categories.categories
    default:
      return state
  }
}