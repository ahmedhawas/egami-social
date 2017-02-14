import React, { PropTypes } from 'react'
import LoadingMessage from '../../components/LoadingMessage'
import functional from 'react-functional'
import styles from './popularFeedPhotosStyles'

PopularFeedPhotosView.propTypes = {
  getPopularFeedPhotos: PropTypes.func.isRequired,
  $$popularFeedPhotosViewModel: PropTypes.object.isRequired,
  noPopularFeedData: PropTypes.bool.isRequired,
}

function renderFeedData() {
  return (
    <LoadingMessage message={'Loading Popular Feed'} style={styles.loadingProfileContainer} />
  )
}

function renderPhotos($$popularFeedPhotosViewModel) {
  return $$popularFeedPhotosViewModel.map(($$photo) =>
    (<img key={$$photo.get('objectId')}
      src={$$photo.get('thumbnail')}
      style={styles.gridPhoto}
      alt=''
      draggable={false}
    />)
  )
}

function renderFeedPhotos($$popularFeedPhotosViewModel) {
  const images = renderPhotos($$popularFeedPhotosViewModel)
  return (
    <div style={styles.feedPhotos}>
      {images}
    </div>
  )
}

function PopularFeedPhotosView(props) {
  return (
    <div style={styles.popularFeedPhotosContainer}>
      { props.noPopularFeedData ? renderFeedData() : renderFeedPhotos(props.$$popularFeedPhotosViewModel) }
    </div>
  )
}

PopularFeedPhotosView.componentDidMount = (props) => {
  props.getPopularFeedPhotos()
}

export default functional(PopularFeedPhotosView)
