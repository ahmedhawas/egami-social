import { fromJS } from 'immutable'

export const UPDATE_SELECTED_PHOTO_ORDINAL = 'UPDATE_SELECTED_PHOTO_ORDINAL'
export const SET_TRUNCATE_BIO_TEXT = 'SET_TRUNCATE_BIO_TEXT'
export const UPDATE_PHOTO_SWIPE_EVENT = 'UPDATE_PHOTO_SWIPE_EVENT'

export const initialPhotoSwipeState = fromJS({
  mouseDown: false,
  xPosition: null,
})

export const initialStoreState = fromJS({
  selectedPhotoOrdinal: null,
  truncateBioText: true,
  photoSwipeEvent: initialPhotoSwipeState,
})

function previousPhotoObjectId(state, $$photos) {
  const currentSelectedPhotoIndex = $$photos.findIndex(($$photo) =>
    $$photo.get('objectId') === state.get('selectedPhotoOrdinal'))

  const switchToPhotoIndex = currentSelectedPhotoIndex === 0 ? $$photos.size - 1 : currentSelectedPhotoIndex - 1
  return state.update('selectedPhotoOrdinal', () => $$photos.getIn([switchToPhotoIndex, 'objectId']))
}

function nextPhotoObjectId(state, $$photos) {
  const currentSelectedPhotoIndex = $$photos.findIndex(($$photo) =>
    $$photo.get('objectId') === state.get('selectedPhotoOrdinal'))

  const switchToPhotoIndex = currentSelectedPhotoIndex === $$photos.size - 1 ? 0 : currentSelectedPhotoIndex + 1
  return state.update('selectedPhotoOrdinal', () => $$photos.getIn([switchToPhotoIndex, 'objectId']))
}

function updatePhotoSwipe(state, mouseDown, xPosition, $$photos) {
  const currentMouseDown = state.getIn(['photoSwipeEvent', 'mouseDown'])
  const currentxPosition = state.getIn(['photoSwipeEvent', 'xPosition'])

  if (currentMouseDown && !mouseDown) {
    if (xPosition - currentxPosition < -30) {
      return nextPhotoObjectId(state, $$photos)
    } else if (xPosition - currentxPosition > 30) {
      return previousPhotoObjectId(state, $$photos)
    }
    return state.updateIn(['photoSwipeEvent', 'xPosition'], () => null)
  }

  if (mouseDown) {
    const newState = state.updateIn(['photoSwipeEvent', 'mouseDown'], () => true)
    return newState.updateIn(['photoSwipeEvent', 'xPosition'], () => xPosition)
  }

  return state
}

export default function uiReducer(state = initialStoreState, action = {}) {
  switch (action.type) {
  case UPDATE_SELECTED_PHOTO_ORDINAL:
    return state.update('selectedPhotoOrdinal', () => action.photoOrdinal)
  case SET_TRUNCATE_BIO_TEXT:
    return state.update('truncateBioText', () => action.isTruncateText)
  case UPDATE_PHOTO_SWIPE_EVENT:
    return updatePhotoSwipe(state, action.mouseDown, action.xPosition, action.$$photos)
  default:
    return state
  }
}

export function updatePhotoOrdinal(photoOrdinal) {
  return {
    type: UPDATE_SELECTED_PHOTO_ORDINAL,
    photoOrdinal,
  }
}

export function setTruncateBioText(isTruncateText) {
  return {
    type: SET_TRUNCATE_BIO_TEXT,
    isTruncateText,
  }
}

export function updatePhotoSwipeEvent(mouseDown, xPosition, $$photos) {
  return {
    type: UPDATE_PHOTO_SWIPE_EVENT,
    mouseDown,
    xPosition,
    $$photos,
  }
}
