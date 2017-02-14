import should from 'should'
import { fromJS } from 'immutable'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import sinon from 'sinon'
import api from '../../src/lib/utilities/api'
import {GET_USER_FEED_PHOTOS_REQUEST, GET_USER_FEED_PHOTOS_SUCCESS, GET_USER_FEED_PHOTOS_FAILURE,  getUserFeedPhotos }
  from '../../src/modules/userFeedPhotos/userFeedPhotosState'
import {UPDATE_SELECTED_PHOTO_ORDINAL}
  from '../../src/modules/ui/uiState'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('getUserFeedPhotos success', () => {
  const store = mockStore({ userFeedPhotos: fromJS([]) })
  const userFeedPhotosJson = [{ objectId: 1234 }, { objectId: 1554 }, { objectId: 542 }]
  let getUserFeedPhotosStub

  beforeEach(() => {
    getUserFeedPhotosStub = sinon.stub(api, 'getUserFeedPhotos')
  })

  afterEach(() => {
    api.getUserFeedPhotos.restore()
  })

  it('dispatches the correct actions', () => {
    getUserFeedPhotosStub.returns(Promise.resolve({ data: { result: { posts: userFeedPhotosJson }}}))
    const expectedActions = [
      { type: GET_USER_FEED_PHOTOS_REQUEST },
      { type: GET_USER_FEED_PHOTOS_SUCCESS, feedPhotosData: userFeedPhotosJson },
      { type: UPDATE_SELECTED_PHOTO_ORDINAL, photoOrdinal: userFeedPhotosJson[0].objectId },
    ]

    return store.dispatch(getUserFeedPhotos())
      .then(() => {
        should.deepEqual(store.getActions(), expectedActions)
      })
  })
})

describe('getUserFeedPhotos failure', () => {
  const store = mockStore({ userFeedPhotos: fromJS([]) })
  let getUserFeedPhotosStub

  beforeEach(() => {
    getUserFeedPhotosStub = sinon.stub(api, 'getUserFeedPhotos')
  })

  afterEach(() => {
    api.getUserFeedPhotos.restore()
  })

  it('dispatches the correct actions when getting user fails', () => {
    getUserFeedPhotosStub.returns(Promise.reject('some error'))
    const expectedActions = [
      { type: GET_USER_FEED_PHOTOS_REQUEST },
      { type: GET_USER_FEED_PHOTOS_FAILURE, error: 'some error' },
    ]

    return store.dispatch(getUserFeedPhotos())
      .then(() => {
        should.deepEqual(store.getActions(), expectedActions)
      })
  })
})
