import should from 'should'
import {UPDATE_SELECTED_PHOTO_ORDINAL, SET_TRUNCATE_BIO_TEXT, UPDATE_PHOTO_SWIPE_EVENT,
   updatePhotoOrdinal, setTruncateBioText, updatePhotoSwipeEvent}
  from '../../src/modules/ui/uiState'

describe('updatePhotoOrdinal', () => {
  it('should return correct type and ordinal', () => {
    const photoOrdinal = 1232
    const action = updatePhotoOrdinal(photoOrdinal)

    should.equal(action.type, UPDATE_SELECTED_PHOTO_ORDINAL)
    should.equal(action.photoOrdinal, photoOrdinal)
  })
})

describe('setTruncateBioText', () => {
  it('should return correct type and boolean', () => {
    const isTruncateText = false
    const action = setTruncateBioText(isTruncateText)

    should.equal(action.type, SET_TRUNCATE_BIO_TEXT)
    should.equal(action.isTruncateText, isTruncateText)
  })
})

describe('updatePhotoSwipeEvent', () => {
  it('should return correct type and payload', () => {
    const mouseDown = true
    const xPosition = 100
    const $$photos = []
    const action = updatePhotoSwipeEvent(mouseDown, xPosition, $$photos)

    should.equal(action.type, UPDATE_PHOTO_SWIPE_EVENT)
    should.equal(action.mouseDown, mouseDown)
    should.equal(action.xPosition, xPosition)
    should.equal(action.$$photos, $$photos)
  })
})
