import should from 'should'
import {fromJS} from 'immutable'
import userFeedPhotosReducer, {GET_USER_FEED_PHOTOS_SUCCESS, initialStoreState}
  from '../../src/modules/userFeedPhotos/userFeedPhotosState'

describe('uiReducer', () => {
  it('should return initial state with unknown action', () => {
    should.equal(userFeedPhotosReducer(undefined, {}), initialStoreState)
  })

  it('should update the state when GET_USER_FEED_PHOTOS_SUCCESS is dispatched', () => {
    const feedPhotosData = [
      { objectId: 12344 },
      { objectId: 342124444 },
      { objectId: 322354 },
    ]
    const action = { type: GET_USER_FEED_PHOTOS_SUCCESS, feedPhotosData }

    const state = initialStoreState
    const nextStateExpected = fromJS(feedPhotosData)

    should.equal(userFeedPhotosReducer(state, action).equals(nextStateExpected), true)
  })
})
