import { combineReducers } from 'redux'

import userProfileReducer from '../modules/userProfile/userProfileState'
import userFeedPhotosReducer from '../modules/userFeedPhotos/userFeedPhotosState'
import popularFeedPhotosReducer from '../modules/popularFeedPhotos/popularFeedPhotosState'
import uiReducer from '../modules/ui/uiState'

const rootReducer = combineReducers({
  userProfile: userProfileReducer,
  userFeedPhotos: userFeedPhotosReducer,
  popularFeedPhotos: popularFeedPhotosReducer,
  ui: uiReducer,
})

export default rootReducer
