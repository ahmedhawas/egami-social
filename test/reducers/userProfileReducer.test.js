import should from 'should'
import {fromJS} from 'immutable'
import userProfileReducer, {GET_USER_PROFILE_SUCCESS, initialStoreState}
  from '../../src/modules/userProfile/userProfileState'

describe('uiReducer', () => {
  it('should return initial state with unknown action', () => {
    should.equal(userProfileReducer(undefined, {}), initialStoreState)
  })

  it('should update the state when GET_USER_PROFILE_SUCCESS is dispatched', () => {
    const userData = {
      name: 'pumpup',
      id: 123,
    }
    const action = { type: GET_USER_PROFILE_SUCCESS, userData }

    const state = initialStoreState
    const nextStateExpected = fromJS(userData)

    should.equal(userProfileReducer(state, action).equals(nextStateExpected), true)
  })
})
