import React, { PropTypes } from 'react'
import functional from 'react-functional'
import LoadingMessage from '../../components/LoadingMessage'
import styles from './userFeedPhotosStyles'
import ReactTouchEvents from 'react-touch-events'

UserFeedPhotosView.propTypes = {
  $$userFeedPhotosViewModel: PropTypes.object.isRequired,
  noUserFeedPhotosData: PropTypes.bool.isRequired,
  updatePhotoSwipeEvent: PropTypes.func.isRequired,
  getUserFeedPhotos: PropTypes.func.isRequired,
}

function renderNoUserFeedPhotos() {
  return (
    <LoadingMessage message={'Loading User Feed Photos'} style={styles.noUserFeedPhotosContainer} />
  )
}

function handleMouseDown(pageX, updatePhotoSwipeEvent, $$userFeedPhotosViewModel) {
  updatePhotoSwipeEvent(true, pageX, $$userFeedPhotosViewModel)
}

function handleMouseUp(pageX, updatePhotoSwipeEvent, $$userFeedPhotosViewModel) {
  updatePhotoSwipeEvent(false, pageX, $$userFeedPhotosViewModel)
}

function handleMobileSwipe(direction, updatePhotoSwipeEvent, $$userFeedPhotosViewModel) {
  // trigger a mouse swipe in appropriate direction
  if (direction === 'right') {
    updatePhotoSwipeEvent(true, 0, $$userFeedPhotosViewModel)
    updatePhotoSwipeEvent(false, 51, $$userFeedPhotosViewModel)
  } else if (direction === 'left') {
    updatePhotoSwipeEvent(true, 0, $$userFeedPhotosViewModel)
    updatePhotoSwipeEvent(false, -51, $$userFeedPhotosViewModel)
  }
}

function renderImageSlider($$userFeedPhotosViewModel, updatePhotoSwipeEvent) {
  const $$selectedImage = $$userFeedPhotosViewModel.find(($$userPhoto) =>
    $$userPhoto.get('selectedPhoto')
  )
  return (
    <ReactTouchEvents
      onSwipe={(direction) => handleMobileSwipe(direction, updatePhotoSwipeEvent, $$userFeedPhotosViewModel)}
    >
      <img
        id="feed-photo"
        alt=''
        style={styles.feedPhoto}
        draggable={false}
        src={$$selectedImage.get('thumbnail')}
        onMouseDown={(event) => handleMouseDown(event.pageX, updatePhotoSwipeEvent, $$userFeedPhotosViewModel)}
        onMouseUp={(event) => handleMouseUp(event.pageX, updatePhotoSwipeEvent, $$userFeedPhotosViewModel)}
      />
    </ReactTouchEvents>
  )
}

function renderImageSelector($$userFeedPhotosViewModel) {
  const bullets = $$userFeedPhotosViewModel.map(($$userPhoto) => {
    if ($$userPhoto.get('selectedPhoto')) {
      return (
        <p key={$$userPhoto.get('objectId')}
          onClick={$$userPhoto.get('onSliderClickHandler')}
          style={styles.circle}>
          &#x25C9;
        </p>
      )
    }
    return (<p key={$$userPhoto.get('objectId')}
      onClick={$$userPhoto.get('onSliderClickHandler')}
      style={styles.circle}>
      &#9675;
    </p>)
  })

  return (
    <div style={styles.imagePicker}>{bullets}</div>
  )
}

function renderUserFeedPhotos($$userFeedPhotosViewModel, updatePhotoSwipeEvent) {
  return (
    <div>
      {renderImageSlider($$userFeedPhotosViewModel, updatePhotoSwipeEvent)}
      {renderImageSelector($$userFeedPhotosViewModel)}
    </div>
  )
}

function UserFeedPhotosView(props) {
  return (
    <div style={styles.userFeedPhotosContainer}>
      { props.noUserFeedPhotosData ?
        renderNoUserFeedPhotos() :
        renderUserFeedPhotos(props.$$userFeedPhotosViewModel, props.updatePhotoSwipeEvent) }
    </div>
  )
}

UserFeedPhotosView.componentDidMount = (props) => {
  props.getUserFeedPhotos()
}

export default functional(UserFeedPhotosView)
