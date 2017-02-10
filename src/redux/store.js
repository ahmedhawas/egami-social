import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducer'
import middleware from './middleware'

export default function reconcilliationAppStore(initialState = {}) {
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware), window.devToolsExtension ? window.devToolsExtension() : f => f))
  return store
}
