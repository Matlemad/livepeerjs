import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { rootReducer, rootSaga } from './services'

export const history = createHistory()
export const sagaMiddleware = createSagaMiddleware()

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history), sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window
  if (devToolsExtension) enhancers.push(devToolsExtension())
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)
const store = createStore(rootReducer, initialState, composedEnhancers)

sagaMiddleware.run(rootSaga)

export default store
