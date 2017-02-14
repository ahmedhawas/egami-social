import should from 'should'
import { fromJS } from 'immutable'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import sinon from 'sinon'
import api from '../../src/lib/utilities/api'
import {GET_POPULAR_FEED_PHOTOS_REQUEST, GET_POPULAR_FEED_PHOTOS_SUCCESS,
  GET_POPULAR_FEED_PHOTOS_FAILURE, getPopularFeedPhotos }
  from '../../src/modules/PopularFeedPhotos/PopularFeedPhotosState'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('getPopularFeedPhotos success', () => {
  const store = mockStore({ PopularFeedPhotos: fromJS([]) })
  const PopularFeedPhotosJson = [{ objectId: 1234 }, { objectId: 1554 }, { objectId: 542 }]
  let getPopularFeedPhotosStub

  beforeEach(() => {
    getPopularFeedPhotosStub = sinon.stub(api, 'getPopularFeedPhotos')
  })

  afterEach(() => {
    api.getPopularFeedPhotos.restore()
  })

  it('dispatches the correct actions', () => {
    getPopularFeedPhotosStub.returns(Promise.resolve({ data: { result: { posts: PopularFeedPhotosJson }}}))
    const expectedActions = [
      { type: GET_POPULAR_FEED_PHOTOS_REQUEST },
      { type: GET_POPULAR_FEED_PHOTOS_SUCCESS, feedPhotosData: PopularFeedPhotosJson },
    ]

    return store.dispatch(getPopularFeedPhotos())
      .then(() => {
        should.deepEqual(store.getActions(), expectedActions)
      })
  })
})

describe('getPopularFeedPhotos failure', () => {
  const store = mockStore({ PopularFeedPhotos: fromJS([]) })
  let getPopularFeedPhotosStub

  beforeEach(() => {
    getPopularFeedPhotosStub = sinon.stub(api, 'getPopularFeedPhotos')
  })

  afterEach(() => {
    api.getPopularFeedPhotos.restore()
  })

  it('dispatches the correct actions', () => {
    getPopularFeedPhotosStub.returns(Promise.reject('some error'))
    const expectedActions = [
      { type: GET_POPULAR_FEED_PHOTOS_REQUEST },
      { type: GET_POPULAR_FEED_PHOTOS_FAILURE, error: 'some error' },
    ]

    return store.dispatch(getPopularFeedPhotos())
      .then(() => {
        should.deepEqual(store.getActions(), expectedActions)
      })
  })
})
