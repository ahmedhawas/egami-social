import parseLinks from  '../../../src/lib/utilities/parseLinks'
import should from 'should'

describe('parseLinks', () => {
  it('should return empty if textInput is not passed in',  () => {
    const result = parseLinks(undefined)

    should.equal(result, '')
  })

  it('should return a parsed version of the text with no anchors if no # and/or @ are passed',  () => {
    const textInput = 'this text does not have any hashtags or mentions, there has less reach. Oh no.'
    const result = parseLinks(textInput)

    should.equal(result.props.dangerouslySetInnerHTML.__html, textInput)
  })

  it('should return a parsed version of the text with anchors if # and/or @ are passed',  () => {
    const textInput = 'new day here in #toronto. Mention me @ahmedhawas7 for some daily motivation'
    const expetedParsedText = 'new day here in <a target="_blank" href="https://www.pumpup.com">#toronto</a>. '+
    'Mention me <a target="_blank" href="https://www.pumpup.com">@ahmedhawas7</a> for some daily motivation'
    const result = parseLinks(textInput)

    should.equal(result.props.dangerouslySetInnerHTML.__html, expetedParsedText)
  })
})
