import should from 'should'
import {fromJS} from 'immutable'
import uiReducer, {UPDATE_SELECTED_PHOTO_ORDINAL, SET_TRUNCATE_BIO_TEXT, UPDATE_PHOTO_SWIPE_EVENT,
  initialStoreState, initialPhotoSwipeState} from '../../src/modules/ui/uiState'

describe('uiReducer', () => {
  it('should return initial state with unknown action', () => {
    should.equal(uiReducer(undefined, {}), initialStoreState)
  })

  it('should update the state when SET_TRUNCATE_BIO_TEXT is dispatched', () => {
    const isTruncateText = false
    const action = { type: SET_TRUNCATE_BIO_TEXT, isTruncateText }

    const state = initialStoreState
    const nextStateExpected = fromJS({ selectedPhotoOrdinal: null, truncateBioText: false,
      photoSwipeEvent: initialPhotoSwipeState})

    should.equal(uiReducer(state, action).equals(nextStateExpected), true)
  })

  it('should update the state when UPDATE_SELECTED_PHOTO_ORDINAL is dispatched', () => {
    const photoOrdinal = 123
    const action = { type: UPDATE_SELECTED_PHOTO_ORDINAL, photoOrdinal }

    const state = initialStoreState
    const nextStateExpected = fromJS({ selectedPhotoOrdinal: photoOrdinal, truncateBioText: true,
      photoSwipeEvent: initialPhotoSwipeState })

    should.equal(uiReducer(state, action).equals(nextStateExpected), true)
  })

  it('should update to previous photo if UPDATE_PHOTO_SWIPE_EVENT triggers it', () => {
    const $$photos = fromJS([
      {objectId: 1},
      {objectId: 2},
      {objectId: 3},
      {objectId: 4},
    ])
    const action = { type: UPDATE_PHOTO_SWIPE_EVENT, mouseDown: false, xPosition: 101, $$photos }

    const state = fromJS({
      selectedPhotoOrdinal: 2,
      photoSwipeEvent: {
        mouseDown: true,
        xPosition: 0,
      },
    })
    const nextStateExpected = fromJS({ selectedPhotoOrdinal: 1, photoSwipeEvent: { mouseDown: true,
      xPosition: 0 }})

    should.equal(uiReducer(state, action).equals(nextStateExpected), true)
  })

  it('should update to previous photo if UPDATE_PHOTO_SWIPE_EVENT triggers it and current photo is first on the list',
  () => {
    const $$photos = fromJS([
      {objectId: 1},
      {objectId: 2},
      {objectId: 3},
      {objectId: 4},
    ])
    const action = { type: UPDATE_PHOTO_SWIPE_EVENT, mouseDown: false, xPosition: 101, $$photos }

    const state = fromJS({
      selectedPhotoOrdinal: 1,
      photoSwipeEvent: {
        mouseDown: true,
        xPosition: 0,
      },
    })
    const nextStateExpected = fromJS({ selectedPhotoOrdinal: 4, photoSwipeEvent: { mouseDown: true,
      xPosition: 0 }})

    should.equal(uiReducer(state, action).equals(nextStateExpected), true)
  })

  it('should update to next photo if UPDATE_PHOTO_SWIPE_EVENT triggers it', () => {
    const $$photos = fromJS([
      {objectId: 1},
      {objectId: 2},
      {objectId: 3},
      {objectId: 4},
    ])
    const action = { type: UPDATE_PHOTO_SWIPE_EVENT, mouseDown: false, xPosition: 101, $$photos }

    const state = fromJS({
      selectedPhotoOrdinal: 2,
      photoSwipeEvent: {
        mouseDown: true,
        xPosition: 202,
      },
    })
    const nextStateExpected = fromJS({ selectedPhotoOrdinal: 3, photoSwipeEvent: { mouseDown: true,
      xPosition: 202 }})

    should.equal(uiReducer(state, action).equals(nextStateExpected), true)
  })

  it('should update to next photo if UPDATE_PHOTO_SWIPE_EVENT triggers it and current photo is last on the list',
  () => {
    const $$photos = fromJS([
      {objectId: 1},
      {objectId: 2},
      {objectId: 3},
      {objectId: 4},
    ])
    const action = { type: UPDATE_PHOTO_SWIPE_EVENT, mouseDown: false, xPosition: 101, $$photos }

    const state = fromJS({
      selectedPhotoOrdinal: 4,
      photoSwipeEvent: {
        mouseDown: true,
        xPosition: 202,
      },
    })
    const nextStateExpected = fromJS({ selectedPhotoOrdinal: 1, photoSwipeEvent: { mouseDown: true,
      xPosition: 202 }})

    should.equal(uiReducer(state, action).equals(nextStateExpected), true)
  })

  it('should not update the photo oridnal and reset xPosition if UPDATE_PHOTO_SWIPE_EVENT is not enough to trigger it',
  () => {
    const $$photos = fromJS([
      {objectId: 1},
      {objectId: 2},
      {objectId: 3},
      {objectId: 4},
    ])
    const action = { type: UPDATE_PHOTO_SWIPE_EVENT, mouseDown: false, xPosition: 101, $$photos }

    const state = fromJS({
      selectedPhotoOrdinal: 4,
      photoSwipeEvent: {
        mouseDown: true,
        xPosition: 130,
      },
    })
    const nextStateExpected = fromJS({ selectedPhotoOrdinal: 4, photoSwipeEvent: { mouseDown: true,
      xPosition: null }})

    should.equal(uiReducer(state, action).equals(nextStateExpected), true)
  })
})
