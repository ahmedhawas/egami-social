import axios from 'axios'

export const HOST_PREFIX = 'http://api.pumpup.com/1'
export const SESSION_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.' +
'UK2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g'
export const API_VERSION = '4.7.0'

export default {
  getUserProfile: function getUserProfile() {
    const requestBody = {
      '_method': 'GET',
      '_version': API_VERSION,
      '_SessionToken': SESSION_TOKEN,
    }

    return axios.post(`${HOST_PREFIX}/classes/User/318381`, requestBody)
  },
  getUserFeedPhotos: function getUserFeedPhotos() {
    const requestBody = {
      'isThumbnailsOnly': true,
      'limit': 5,
      'userId': 2707798,
      '_method': 'POST',
      '_version': API_VERSION,
      '_SessionToken': SESSION_TOKEN,
    }

    return axios.post(`${HOST_PREFIX}/functions/feed/profile/load-batch`, requestBody)
  },
  getPopularFeedPhotos: function getPopularFeedPhotos() {
    const requestBody = {
      'isThumbnailsOnly': true,
      'limit': 18,
      '_method': 'POST',
      '_version': API_VERSION,
      '_SessionToken': SESSION_TOKEN,
    }

    return axios.post(`${HOST_PREFIX}/functions/feed/popular/load-batch`, requestBody)
  },
}
