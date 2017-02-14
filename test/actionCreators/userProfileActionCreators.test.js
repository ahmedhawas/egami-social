import should from 'should'
import { fromJS } from 'immutable'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import sinon from 'sinon'
import api from '../../src/lib/utilities/api'
import {GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAILURE, getUserProfile }
  from '../../src/modules/userProfile/userProfileState'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('getUserProfile success', () => {
  const store = mockStore({ userProfile: fromJS({}) })
  const userProfileJson = {
    name: 'pumpup',
    updatedAt: '2017-02-13T05:41:18.855Z',
    postCount: 2540,
    followerCount: 681294,
  }
  let getUserProfileStub

  beforeEach(() => {
    getUserProfileStub = sinon.stub(api, 'getUserProfile')
  })

  afterEach(() => {
    api.getUserProfile.restore()
  })

  it('dispatches the correct actions', () => {
    getUserProfileStub.returns(Promise.resolve({ data: userProfileJson }))
    const expectedActions = [
      { type: GET_USER_PROFILE_REQUEST },
      { type: GET_USER_PROFILE_SUCCESS, userData: userProfileJson },
    ]

    return store.dispatch(getUserProfile())
      .then(() => {
        should.deepEqual(store.getActions(), expectedActions)
      })
  })
})

describe('getUserProfile fail', () => {
  const store = mockStore({ userProfile: fromJS({}) })
  let getUserProfileStub

  beforeEach(() => {
    getUserProfileStub = sinon.stub(api, 'getUserProfile')
  })

  afterEach(() => {
    api.getUserProfile.restore()
  })

  it('dispatches the correct actions', () => {
    getUserProfileStub.returns(Promise.reject('some error'))
    const expectedActions = [
      { type: GET_USER_PROFILE_REQUEST },
      { type: GET_USER_PROFILE_FAILURE, error: 'some error' },
    ]
    getUserProfile()
    return store.dispatch(getUserProfile())
      .then(() => {
        should.deepEqual(store.getActions(), expectedActions)
      })
  })
})
