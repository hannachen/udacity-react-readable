import * as types from '../actions/types'

export const categories = (state = {}, action) => {
  switch(action.type) {
    case types.FETCH_CATEGORIES_RECEIVED:
      const { categories } = action
      return categories.reduce((cats = {}, cat) => {
        cats[cat.path] = cat
        return cats
      }, {})
    default:
      return state
  }
}