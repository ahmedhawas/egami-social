import { fromJS } from 'immutable'
import api from '../../lib/utilities/api'
import {updatePhotoOrdinal} from '../ui/uiState'

export const GET_USER_FEED_PHOTOS_REQUEST = 'GET_USER_FEED_PHOTOS_REQUEST'
export const GET_USER_FEED_PHOTOS_SUCCESS = 'GET_USER_FEED_PHOTOS_SUCCESS'
export const GET_USER_FEED_PHOTOS_FAILURE = 'GET_USER_FEED_PHOTOS_FAILURE'

export const initialStoreState = fromJS([])

function updateUserFeedPhotos(state, feedPhotosData) {
  return state.update(() => fromJS(feedPhotosData))
}

export default function userFeedPhotosReducer(state = initialStoreState, action = {}) {
  switch (action.type) {
  case GET_USER_FEED_PHOTOS_SUCCESS:
    return updateUserFeedPhotos(state, action.feedPhotosData)
  default:
    return state
  }
}

function getUserFeedPhotosRequest() {
  return {
    type: GET_USER_FEED_PHOTOS_REQUEST,
  }
}

export function getUserFeedPhotosSuccess(feedPhotosData) {
  return {
    type: GET_USER_FEED_PHOTOS_SUCCESS,
    feedPhotosData,
  }
}

export function getUserFeedPhotosFailure(error) {
  return {
    type: GET_USER_FEED_PHOTOS_FAILURE,
    error,
  }
}

export function getUserFeedPhotos() {
  return dispatch => {
    dispatch(getUserFeedPhotosRequest())

    return api.getUserFeedPhotos()
      .then(res => {
        dispatch(getUserFeedPhotosSuccess(res.data.result.posts))
        dispatch(updatePhotoOrdinal(res.data.result.posts[0].objectId))
      })
      .catch(err => dispatch(getUserFeedPhotosFailure(err)))
  }
}
