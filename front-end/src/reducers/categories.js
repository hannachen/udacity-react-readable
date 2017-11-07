import * as types from '../actions/index'

export const categories = (state = {}, action) => {
  switch(action.type) {
    case types.FETCH_CATEGORIES:
      const { categories } = action
      const test = (categories.categories).reduce((cats = {}, cat) => {
        cats[cat.path] = cat
        return cats
      }, {})
      return test
    default:
      return state
  }
}