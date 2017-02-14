import React from 'react'
import UserProfileViewContainer from './modules/userProfile/UserProfileViewContainer'
import UserFeedPhotosViewContainer from './modules/userFeedPhotos/UserFeedPhotosViewContainer'
import PopularFeedPhotosViewContainer from './modules/popularFeedPhotos/PopularFeedPhotosViewContainer'

export default function App() {
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <UserProfileViewContainer />
      <UserFeedPhotosViewContainer />
      <PopularFeedPhotosViewContainer />
    </div>
  )
}
