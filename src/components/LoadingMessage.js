import React, { PropTypes } from 'react'

LoadingMessage.propTypes = {
  style: PropTypes.object,
  message: PropTypes.string.isRequired,
}

export default function LoadingMessage(props) {
  return (
    <div style={props.style}>
      <h5>{props.message}</h5>
    </div>
  )
}
