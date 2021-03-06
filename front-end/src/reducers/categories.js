import * as types from '../actions/types'

export const categories = (state = {}, action) => {
  switch(action.type) {
    case types.FETCH_CATEGORIES_RECEIVED:
      const { categories } = action
      return categories.reduce((cats = {}, cat) => {
        const category = state[cat.path] || {}
        const postCount = category['postCount'] || 0
        cat.postCount = postCount
        cats[cat.path] = cat
        return cats
      }, {})
    case types.UPDATE_CATEGORY_POST_COUNT:
      const { posts } = action
      // Clear all post count and start over...
      const resetCategories = Object.keys(state).reduce((result = {}, category) => {
        return {
          ...result,
          [category]: {
            ...state[category],
            postCount: 0
          }
        }
      }, {})
      const categoriesWithPostCount = posts.reduce((result = {}, post) => {
        const category = result[post.category] || {}
        const postCount = (category['postCount'] || 0) + 1
        return {
          ...result,
          [post.category]: {
            ...state[post.category],
            postCount
          }
        }
      }, {})
      return {
        ...resetCategories,
        ...categoriesWithPostCount
      }
    default:
      return state
  }
}