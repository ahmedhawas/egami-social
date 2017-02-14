import React from 'react'

export default function parseLinks(textInput) {
  if (!textInput) { return '' }
  let parsedText = textInput
  parsedText = parsedText.replace(/(^|\s)(#[a-z\d-]+)/ig, '$1<a target="_blank" href="https://www.pumpup.com">$2</a>')
  parsedText = parsedText.replace(/(^|\s)(@[a-z\d-]+)/ig, '$1<a target="_blank" href="https://www.pumpup.com">$2</a>')

  return (<p dangerouslySetInnerHTML={{__html: parsedText}}></p>)
}
