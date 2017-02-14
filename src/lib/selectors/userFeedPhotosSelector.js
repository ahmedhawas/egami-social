import { createSelector } from 'reselect'

const FEED_PHOTOS_SELECTED_DATA = ['thumbnail', 'objectId']

export function userFeedPhotosSelector(state) {
  return state.userFeedPhotos
}

export function selectedPhotoOrdinalSelector(state) {
  return state.ui.get('selectedPhotoOrdinal')
}

function noSelectedAndFirstIndex(selectedPhotoOrdinal, index) {
  return !selectedPhotoOrdinal && index === 0
}

function currentPhotoMatchesSelectedPhoto(selectedPhotoOrdinal, currentPhotoOrdinal) {
  return selectedPhotoOrdinal === currentPhotoOrdinal
}

function getUserFeedPhotosData(userFeedPhotosData, selectedPhotoOrdinal) {
  return userFeedPhotosData.map(($$photo, index) => {
    let $$constructedPhoto = $$photo.filter((_value, key) => FEED_PHOTOS_SELECTED_DATA.includes(key))
    $$constructedPhoto = $$constructedPhoto.set('selectedPhoto', false)
    
    if (noSelectedAndFirstIndex(selectedPhotoOrdinal, index)
    || currentPhotoMatchesSelectedPhoto(selectedPhotoOrdinal, $$photo.get('objectId'))) {
      return $$constructedPhoto.update('selectedPhoto', () => true)
    }
    return $$constructedPhoto
  })
}

const userFeedPhotosDataSelector =
  createSelector(userFeedPhotosSelector, selectedPhotoOrdinalSelector, getUserFeedPhotosData)

export default userFeedPhotosDataSelector
