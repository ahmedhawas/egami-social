import { createSelector } from 'reselect'

const FEED_PHOTOS_SELECTED_DATA = ['thumbnail', 'objectId']

export function popularFeedPhotosSelector(state) {
  return state.popularFeedPhotos
}

function getPopularFeedPhotosData(popularFeedPhotosData) {
  return popularFeedPhotosData.map(($$photo, index) =>
    $$photo.filter((_value, key) => FEED_PHOTOS_SELECTED_DATA.includes(key))
  )
}

const popularFeedPhotosDataSelector =
  createSelector(popularFeedPhotosSelector, getPopularFeedPhotosData)

export default popularFeedPhotosDataSelector
