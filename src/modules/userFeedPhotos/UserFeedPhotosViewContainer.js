import { connect } from 'react-redux'
import UserFeedPhotosView from './UserFeedPhotosView'
import { getUserFeedPhotos } from './userFeedPhotosState'
import { updatePhotoOrdinal, updatePhotoSwipeEvent, selectPreviousPhotoOrdinal,
  selectNextPhotoOrdinal } from '../ui/uiState'
import userFeedPhotosSelector from '../../lib/selectors/userFeedPhotosSelector'

const ACTION_CREATORS = { getUserFeedPhotos, updatePhotoOrdinal, selectPreviousPhotoOrdinal,
  selectNextPhotoOrdinal, updatePhotoSwipeEvent}

function assignImageSliderHandlers($$userFeedPhotosView, onSelectAction, onSwipeLeftAction, onSwipeRightAction) {
  return $$userFeedPhotosView
  .map(($$userFeedPhoto) => {
    return $$userFeedPhoto.set('onSliderClickHandler', () => onSelectAction($$userFeedPhoto.get('objectId')))
  })
}

function mapStateToProps(state) {
  return {
    $$userFeedPhotosViewState: userFeedPhotosSelector(state),
  }
}

function mergeProps(stateProps, dispatchProps) {
  const onSelectAction = dispatchProps.updatePhotoOrdinal
  const onSwipeLeftAction = dispatchProps.selectNextPhotoOrdinal
  const onSwipeRightAction = dispatchProps.selectPreviousPhotoOrdinal
  const $$userFeedPhotosViewModel = assignImageSliderHandlers(
    stateProps.$$userFeedPhotosViewState, onSelectAction, onSwipeLeftAction, onSwipeRightAction)

  return {
    $$userFeedPhotosViewModel,
    noUserFeedPhotosData: $$userFeedPhotosViewModel.size === 0,
    getUserFeedPhotos: dispatchProps.getUserFeedPhotos,
    updatePhotoSwipeEvent: dispatchProps.updatePhotoSwipeEvent,
  }
}

export default connect(mapStateToProps, ACTION_CREATORS, mergeProps)(UserFeedPhotosView)
