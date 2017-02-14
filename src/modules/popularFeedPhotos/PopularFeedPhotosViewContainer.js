import { connect } from 'react-redux'
import PopularFeedPhotosView from './PopularFeedPhotosView'
import { getPopularFeedPhotos } from './popularFeedPhotosState'
import popularFeedPhotosSelector from '../../lib/selectors/popularFeedPhotosSelector'

const ACTION_CREATORS = { getPopularFeedPhotos }

function mapStateToProps(state) {
  return {
    $$popularFeedPhotosViewState: popularFeedPhotosSelector(state),
  }
}

function mergeProps(stateProps, dispatchProps) {
  return {
    $$popularFeedPhotosViewModel: stateProps.$$popularFeedPhotosViewState,
    getPopularFeedPhotos: dispatchProps.getPopularFeedPhotos,
    noPopularFeedData: stateProps.$$popularFeedPhotosViewState.size === 0,
  }
}

export default connect(mapStateToProps, ACTION_CREATORS, mergeProps)(PopularFeedPhotosView)
