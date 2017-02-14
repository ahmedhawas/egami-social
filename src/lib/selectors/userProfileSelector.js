import { createSelector } from 'reselect'

const USER_SELECTED_DATA = ['name', 'bio', 'profileThumbnail' ]

export function userProfileSelector(state) {
  return state.userProfile
}

function getUserProfileData(userData) {
  return userData.filter((_value, key) => {
    return USER_SELECTED_DATA.includes(key)
  })
}

const userProfileDataSelector =
  createSelector(userProfileSelector, getUserProfileData)

export default userProfileDataSelector
