import { combineReducers } from 'redux'

const imagesReducer = () => [ { image: 'Blah' } ]

const rootReducer = combineReducers({
  images: imagesReducer,
})

export default rootReducer
