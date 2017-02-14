import { fromJS } from 'immutable'
import should from 'should'
import userFeedPhotosDataSelector, {userFeedPhotosSelector, selectedPhotoOrdinalSelector}
  from  '../../../src/lib/selectors/userFeedPhotosSelector'

describe('userFeedPhotosDataSelector', () => {
  it('returns the photos with selected photo set and chosen attributes', () => {
    const selectedImageOrdinal = 134
    const $$state = {
      userFeedPhotos: fromJS([
        { objectId: 1232,
          className: 'Post',
          thumbnail: 'https://d1m37qdzmw041i.cloudfront.net/17517155-1474064295274.jpg' },
        { objectId: selectedImageOrdinal,
          className: 'Post',
          thumbnail: 'https://d1m37qdzmw041i.cloudfront.net/17517155-1474064295274.jpg' },
        { objectId: 145,
          className: 'Post',
          thumbnail: 'https://d1m37qdzmw041i.cloudfront.net/17517155-1474064295274.jpg' },
      ]),
      ui: fromJS({
        selectedPhotoOrdinal: selectedImageOrdinal,
      }),
    }

    const $$expectedSelectorResult = fromJS([
      { objectId: 1232,
        selectedPhoto: false,
        thumbnail: 'https://d1m37qdzmw041i.cloudfront.net/17517155-1474064295274.jpg' },
      { objectId: selectedImageOrdinal,
        selectedPhoto: true,
        thumbnail: 'https://d1m37qdzmw041i.cloudfront.net/17517155-1474064295274.jpg' },
      { objectId: 145,
        selectedPhoto: false,
        thumbnail: 'https://d1m37qdzmw041i.cloudfront.net/17517155-1474064295274.jpg' },
    ])

    const $$result = userFeedPhotosDataSelector($$state)

    should.equal($$result.equals($$expectedSelectorResult), true)
  })
})

describe('userFeedPhotosSelector', () => {
  it('selects the userFeedPhotos object from the state tree', () => {
    const $$state = {
      userFeedPhotos: fromJS([
        { objectId: 123 },
      ]),
      subTree2: fromJS({ foo: 'bar' }),
      subTree3: fromJS({ bar: 'foo' }),
    }

    const $$expectedSelectorResult = $$state.userFeedPhotos

    const $$result = userFeedPhotosSelector($$state)

    should.equal($$result.equals($$expectedSelectorResult), true)
  })
})

describe('selectedPhotoOrdinalSelector', () => {
  it('selects the selectedPhotoOrdinalSelector object from the state tree', () => {
    const $$state = {
      ui: fromJS({
        selectedPhotoOrdinal: 123,
      }),
      subTree2: fromJS({ foo: 'bar' }),
      subTree3: fromJS({ bar: 'foo' }),
    }

    const expectedSelectorResult = $$state.ui.get('selectedPhotoOrdinal')

    const result = selectedPhotoOrdinalSelector($$state)

    should.equal(result, expectedSelectorResult)
  })
})
