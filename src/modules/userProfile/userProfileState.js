import { fromJS } from 'immutable'
import api from '../../lib/utilities/api'

export const GET_USER_PROFILE_REQUEST = 'GET_USER_PROFILE_REQUEST'
export const GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS'
export const GET_USER_PROFILE_FAILURE = 'GET_USER_PROFILE_FAILURE'

export const initialStoreState = fromJS({})

function updateUserProfile(state, userData) {
  return state.update(() => fromJS(userData))
}

export default function userProfileReducer(state = initialStoreState, action = {}) {
  switch (action.type) {
  case GET_USER_PROFILE_SUCCESS:
    return updateUserProfile(state, action.userData)
  default:
    return state
  }
}

function getUserProfileRequest() {
  return {
    type: GET_USER_PROFILE_REQUEST,
  }
}

function getUserProfileSuccess(userData) {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    userData,
  }
}

function getUserProfileFailure(error) {
  return {
    type: GET_USER_PROFILE_FAILURE,
    error,
  }
}

export function getUserProfile() {
  return dispatch => {
    dispatch(getUserProfileRequest())

    return api.getUserProfile()
      .then(res => dispatch(getUserProfileSuccess(res.data)))
      .catch(err => dispatch(getUserProfileFailure(err)))
  }
}
