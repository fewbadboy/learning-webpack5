import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import _ from 'lodash'

import '../../icons'

import '@/styles/index.scss'

class Webpack extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick(e) {
    this.setState(state => ({
      count: state.count + 1
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
      </div>
    )
  }
}

const app = ReactDOMClient.createRoot(document.getElementById('app'))

app.render(
  <React.StrictMode>
    <Webpack />
    <svg>
      <use xlinkHref="#icon-bug" />
    </svg>
    <img src={ new URL('../../images/skill.svg', import.meta.url) } />
    <div className='skill'>测试</div>
  </React.StrictMode>
)
