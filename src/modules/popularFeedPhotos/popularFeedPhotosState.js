import { fromJS } from 'immutable'
import api from '../../lib/utilities/api'

export const GET_POPULAR_FEED_PHOTOS_REQUEST = 'GET_POPULAR_FEED_PHOTOS_REQUEST'
export const GET_POPULAR_FEED_PHOTOS_SUCCESS = 'GET_POPULAR_FEED_PHOTOS_SUCCESS'
export const GET_POPULAR_FEED_PHOTOS_FAILURE = 'GET_POPULAR_FEED_PHOTOS_FAILURE'

export const initialStoreState = fromJS([])

function updatePopularFeedPhotos(state, feedPhotosData) {
  return state.update(() => fromJS(feedPhotosData))
}

export default function popularFeedPhotosReducer(state = initialStoreState, action = {}) {
  switch (action.type) {
  case GET_POPULAR_FEED_PHOTOS_SUCCESS:
    return updatePopularFeedPhotos(state, action.feedPhotosData)
  default:
    return state
  }
}

function getPopularFeedPhotosRequest() {
  return {
    type: GET_POPULAR_FEED_PHOTOS_REQUEST,
  }
}

export function getPopularFeedPhotosSuccess(feedPhotosData) {
  return {
    type: GET_POPULAR_FEED_PHOTOS_SUCCESS,
    feedPhotosData,
  }
}

export function getPopularFeedPhotosFailure(error) {
  return {
    type: GET_POPULAR_FEED_PHOTOS_FAILURE,
    error,
  }
}

export function getPopularFeedPhotos() {
  return dispatch => {
    dispatch(getPopularFeedPhotosRequest())

    return api.getPopularFeedPhotos()
      .then(res => dispatch(getPopularFeedPhotosSuccess(res.data.result.posts)))
      .catch(err => dispatch(getPopularFeedPhotosFailure(err)))
  }
}
