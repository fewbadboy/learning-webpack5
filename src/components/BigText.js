import React from 'react'
import PropTypes from 'prop-types'

export default class BigText extends React.Component {
  render () {
    return <h1>{ this.props.children }</h1>
  }
}

BigText.displayName = BigText
BigText.propTypes = {
  children: PropTypes.node
}
