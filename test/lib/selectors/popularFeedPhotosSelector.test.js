import { fromJS } from 'immutable'
import should from 'should'
import popularFeedPhotosDataSelector, {popularFeedPhotosSelector}
  from  '../../../src/lib/selectors/popularFeedPhotosSelector'

describe('popularFeedPhotosDataSelector', () => {
  it('returns the feed photos with the chosen attributes', () => {
    const selectedImageOrdinal = 134
    const $$state = {
      popularFeedPhotos: fromJS([
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
    }

    const $$expectedSelectorResult = fromJS([
      { objectId: 1232,
        thumbnail: 'https://d1m37qdzmw041i.cloudfront.net/17517155-1474064295274.jpg' },
      { objectId: selectedImageOrdinal,
        thumbnail: 'https://d1m37qdzmw041i.cloudfront.net/17517155-1474064295274.jpg' },
      { objectId: 145,
        thumbnail: 'https://d1m37qdzmw041i.cloudfront.net/17517155-1474064295274.jpg' },
    ])

    const $$result = popularFeedPhotosDataSelector($$state)

    should.equal($$result.equals($$expectedSelectorResult), true)
  })
})

describe('popularFeedPhotosSelector', () => {
  it('selects the userFeedPhotos object from the state tree', () => {
    const $$state = {
      popularFeedPhotos: fromJS([
        { objectId: 123 },
      ]),
      subTree2: fromJS({ foo: 'bar' }),
      subTree3: fromJS({ bar: 'foo' }),
    }

    const $$expectedSelectorResult = $$state.popularFeedPhotos

    const $$result = popularFeedPhotosSelector($$state)

    should.equal($$result.equals($$expectedSelectorResult), true)
  })
})
