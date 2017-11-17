import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { fetchCategories } from './actions'
import App from './components/App'
import thunk from 'redux-thunk'
import api from './utils/api'
import './index.css'

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger),
    applyMiddleware(thunk)
  )
)

function getCategories() {
  api.fetchCategories()
    .then((categories) => {
      store.dispatch(fetchCategories(categories))
    })
}

getCategories()

ReactDOM.render(
  <Provider store={store}>
    <Router><App /></Router>
  </Provider>, document.getElementById('root'))