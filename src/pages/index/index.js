import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import PropTypes from 'prop-types'
import _ from 'lodash'

import '../../icons'

import '@/styles/index.scss'

class Webpack extends React.Component {

  static propTypes = {
    increment: PropTypes.number
  }

  static defaultProps = {
    increment: 1
  }

  constructor(props) {
    super(props)
    this.state = { count: 0 }
    this.handleClick = this.handleClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async handleClick(e) {
    this.setState((state, props) => ({
      count: state.count + props.increment
    }))

    return await import('@/print').then(module => {
      const print = module.default
      print()
      console.log(e)
    })
  }

  componentDidMount() {}

  componentWillUnmount() {}

  getButtonText() {
    return {
      __html: `Button Count ${this.state.count}`
    }
  }

  handleArrowClick = (name, e) => {
    console.log(this, e)
    console.info(name)
  }

  handleDelete(name, e) {
    console.log(name, e)
  }

  render() {
    return (
      <div className='red'>
        <span style={{marginRight: 8 + 'px'}}>
          { _.join(['Hello', 'webpack'], ' ') }
        </span>
        <button
          onClick={this.handleClick}
          dangerouslySetInnerHTML={ this.getButtonText() }
        />
        <button
          onClick={(e) => this.handleArrowClick('webpack', e)}
        >
          webpack
        </button>
        <button
          onClick={this.handleDelete.bind(this, 'delete')}
        >
          删除
        </button>
      </div>
    )
  }
}

class Form extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('You clicked submit.')
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <button type='submit'>submit</button>
      </form>
    )
  }
}

const app = ReactDOMClient.createRoot(document.getElementById('app'))

app.render(
  <React.StrictMode>
    <Webpack />
    <Form />
    <svg>
      <use xlinkHref="#icon-bug" />
    </svg>
    <img src={ new URL('../../images/skill.svg', import.meta.url) } />
    <div className='skill'>测试</div>
  </React.StrictMode>
)
