import React, { PropTypes } from 'react'
import functional from 'react-functional'
import LoadingMessage from '../../components/LoadingMessage'
import styles from './userProfileStyles'
import Truncate from 'react-truncate'

UserProfileView.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  setTruncateBioText: PropTypes.func.isRequired,
  $$userProfileViewModel: PropTypes.object.isRequired,
  truncateBioText: PropTypes.bool.isRequired,
  noUserData: PropTypes.bool.isRequired,
}

function renderNoUserData() {
  return (
    <LoadingMessage message={'Loading User Profile'} style={styles.loadingProfileContainer} />
  )
}

function renderUserProfile($$userProfileViewModel, truncateBioText, setTruncateBioText) {
  const bioTextHtml = (<div style={styles.profileBio}>{$$userProfileViewModel.get('bio')}</div>)
  return (
    <div style={styles.profileContainer}>
      <div style={styles.profileThumbnailContainer}>
        <img alt='' src={$$userProfileViewModel.get('profileThumbnail')} style={styles.profileThumbnail} />
      </div>
      <div style={styles.userNameContainer}>
        <h1>{$$userProfileViewModel.get('name')}</h1>
      </div>
      <div style={styles.profileBioContainer}>
        {!truncateBioText ? bioTextHtml :
          <Truncate lines={3}
            ellipsis={<span>... <b style={styles.readMoreText}
                                   onClick={() => setTruncateBioText(false)}>Read more</b>
                     </span>}>
            {bioTextHtml}
          </Truncate>
        }
      </div>
      <hr style={styles.lineBreak}/>
    </div>
  )
}

function UserProfileView(props) {
  return (
    <div style={styles.userProfileContainer}>
      { props.noUserData ?
        renderNoUserData() :
        renderUserProfile(props.$$userProfileViewModel, props.truncateBioText, props.setTruncateBioText) }
    </div>
  )
}

UserProfileView.componentDidMount = (props) => {
  props.getUserProfile()
}

export default functional(UserProfileView)
