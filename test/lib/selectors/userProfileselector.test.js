import { fromJS } from 'immutable'
import should from 'should'
import userProfileDataSelector, {userProfileSelector} from  '../../../src/lib/selectors/userProfileSelector'

describe('userProfileDataSelector', () => {
  it('gets selects the user attributes from the user profile sub tree', () => {
    const $$state = {
      userProfile: fromJS({
        gender: 2,
        className: 'User',
        name: 'pumpup',
        bio: 'Achieve and celebrate your health goals with the worlds most positive community!',
        profileThumbnail: 'https://d1m37qdzmw041i.cloudfront.net/thumbnail/318381-1484908028480.jpg',
        updatedAt: '2017-02-13T04:14:53.684Z',
        postCount: 2540,
        followerCount: 681278,
        profileImage: 'https://d1m37qdzmw041i.cloudfront.net/photos/users/profile/image/318381-1484908028478.jpg',
        location: 'Toronto, Canada',
        role: 3,
        objectId: 318381,
        website: 'blog.pumpup.com',
        createdAt: '2014-02-03T07:21:44.372Z',
      }),
    }

    const $$expectedSelectorResult = fromJS({
      name: 'pumpup',
      bio: 'Achieve and celebrate your health goals with the worlds most positive community!',
      profileThumbnail: 'https://d1m37qdzmw041i.cloudfront.net/thumbnail/318381-1484908028480.jpg',
    })

    const $$result = userProfileDataSelector($$state)

    // seems like shouldJS does not shallow compare immutablsJS Maps as expected,
    // therefore made use of immutable Map function to compare two Maps.
    should.equal($$result.equals($$expectedSelectorResult), true)
  })
})

describe('userProfileSelector', () => {
  it('selects the user object from the state tree', () => {
    const $$state = {
      userProfile: fromJS({
        gender: 2,
      }),
      subTree2: fromJS({ foo: 'bar' }),
      subTree3: fromJS({ bar: 'foo' }),
    }

    const $$expectedSelectorResult = $$state.userProfile

    const $$result = userProfileSelector($$state)

    should.equal($$result.equals($$expectedSelectorResult), true)
  })
})
