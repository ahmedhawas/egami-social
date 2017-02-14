import api, {HOST_PREFIX, SESSION_TOKEN, API_VERSION} from  '../../../src/lib/utilities/api'
import should from 'should'
import sinon from 'sinon'
import axios from 'axios'

describe('api utilities', () => {
  afterEach(() => {
    axios.post.restore()
  })

  describe('getUserProfile', () => {
    it('should call the user profile endpoint', () => {
      const axiosStub = sinon.stub(axios, 'post', () => {})
      const expectedRequestPayload = {
        '_method': 'GET',
        '_version': API_VERSION,
        '_SessionToken': SESSION_TOKEN,
      }

      api.getUserProfile()

      should.equal(axiosStub.callCount, 1)
      should.equal(axiosStub.calledWith(`${HOST_PREFIX}/classes/User/318381`, expectedRequestPayload), true)
    })
  })

  describe('getUserFeedPhotos', () => {
    it('should call the user feed photos endpoint', () => {
      const axiosStub = sinon.stub(axios, 'post', () => {})
      const expectedRequestPayload = {
        'isThumbnailsOnly': true,
        'limit': 5,
        'userId': 2707798,
        '_method': 'POST',
        '_version': API_VERSION,
        '_SessionToken': SESSION_TOKEN,
      }

      api.getUserFeedPhotos()

      should.equal(axiosStub.callCount, 1)
      should.equal(axiosStub.calledWith(`${HOST_PREFIX}/functions/feed/profile/load-batch`,
        expectedRequestPayload), true)
    })
  })

  describe('getPopularFeedPhotos', () => {
    it('should call the popular feed endpoint', () => {
      const axiosStub = sinon.stub(axios, 'post', () => {})
      const expectedRequestPayload = {
        'isThumbnailsOnly': true,
        'limit': 18,
        '_method': 'POST',
        '_version': API_VERSION,
        '_SessionToken': SESSION_TOKEN,
      }

      api.getPopularFeedPhotos()

      should.equal(axiosStub.callCount, 1)
      should.equal(axiosStub.calledWith(`${HOST_PREFIX}/functions/feed/popular/load-batch`,
        expectedRequestPayload), true)
    })
  })
})
