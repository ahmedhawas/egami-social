import { connect } from 'react-redux'
import UserProfileView from './UserProfileView'
import { getUserProfile } from './userProfileState'
import { setTruncateBioText } from '../ui/uiState'
import userProfileDataSelector from '../../lib/selectors/userProfileSelector'
import parseLinks from '../../lib/utilities/parseLinks'

const ACTION_CREATORS = { getUserProfile, setTruncateBioText }

function parseBioLinks($$userProfileViewState) {
  const parsedBioHtml = parseLinks($$userProfileViewState.get('bio'))
  return $$userProfileViewState.update('bio', () => parsedBioHtml)
}

function mapStateToProps(state) {
  return {
    $$userProfileViewState: userProfileDataSelector(state),
    truncateBioText: state.ui.get('truncateBioText'),
  }
}

function mergeProps(stateProps, dispatchProps) {
  const $$userProfileViewModel = parseBioLinks(stateProps.$$userProfileViewState)
  return {
    $$userProfileViewModel,
    getUserProfile: dispatchProps.getUserProfile,
    setTruncateBioText: dispatchProps.setTruncateBioText,
    truncateBioText: stateProps.truncateBioText,
    noUserData: stateProps.$$userProfileViewState.size === 0,
  }
}

export default connect(mapStateToProps, ACTION_CREATORS, mergeProps)(UserProfileView)
