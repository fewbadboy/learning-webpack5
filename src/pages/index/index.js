import React, { Suspense } from 'react'
import * as ReactDOMClient from 'react-dom/client'
import PropTypes from 'prop-types'
import _ from 'lodash'

import '../../icons'

import '@/styles/index.scss'

class Webpack extends React.Component {

  static propTypes = {
    increment: PropTypes.number,
    message: PropTypes.array,
    children: PropTypes.node
  }

  static defaultProps = {
    increment: 1,
    message: [],
    children: null
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

  handleArrowClick = (name, age, e) => {
    console.log(this, e)
    console.info(name, age)
  }

  handleDelete(name, age, e) {
    console.log(name,age, e)
  }

  render() {
    return (
      <div className='red'>
        <span style={{marginRight: 8 + 'px'}}>
          { this.props.message.length > 0 ? _.join(this.props.message, ' ') : 'ZERO MESSAGE' }
        </span>
        <button
          className='btn-primary'
          onClick={this.handleClick}
          dangerouslySetInnerHTML={ this.getButtonText() }
        />
        <button
          className='btn-primary'
          onClick={(e) => this.handleArrowClick('webpack', 20, e)}
        >
          webpack 
        </button>
        <button
          className='btn-primary'
          onClick={this.handleDelete.bind(this, 'delete', 18)}
        >
          删除
        </button>
        <ul>
          { this.props.message.map((item,index) => <li key={index}>{ item }</li>)}
        </ul>
        { this.props.children }
      </div>
    )
  }
}

class Form extends React.Component {

  constructor(props) {
    super(props)
    this.state = { show: true, value: '', uploadFile: '' }
    this.inputFile = React.createRef()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(document.getElementById('file').files)
    const url = URL.createObjectURL(document.getElementById('file').files[0])
    this.setState({
      uploadFile: URL.createObjectURL(document.getElementById('file').files[0])
    })
    URL.revokeObjectURL(url)
    console.log(URL.createObjectURL(document.getElementById('file').files[0]))
    console.log(`You clicked submit. name: ${this.state.value}`)
  }

  componentDidUpdate() {
    console.log('Toggle Show Form')
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value})
  }

  handleDrop = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const dt = e.dataTransfer
    console.log(dt)
    const files = dt.files
    this.setState({
      uploadFile: URL.createObjectURL(files[0])
    })
  }

  handleDragOver = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  handleFile = () => {
    this.inputFile.current.click()
  }

  render() {
    return(
      this.state.show ?
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              账号：<input type='text' name='name' autoComplete='off' value={this.state.value} onChange={this.handleChange} />
            </label>
            <label>
              文件：<input type='file' id='file' name='file' />
            </label>
            <button type='submit'>submit</button>
          </form>
          <img src={ this.state.uploadFile } />
          <input type='file' ref={this.inputFile} onDrop={this.handleDrop} style={{'display': 'none'}} />
          <div  className='drop-image' onClick={this.handleFile} onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
            test
          </div>
        </div>
        : null
    )
  }
}

const app = ReactDOMClient.createRoot(document.getElementById('app'))
const BigText = React.lazy(() => import('@/components/BigText'))
app.render(
  <React.StrictMode>
    <Webpack message={ ['Hello', 'webpack'] }>
      <article>雪山飞狐</article>
    </Webpack>
    <Form />
    <svg className='svg-icon icon-danger'>
      <use xlinkHref="#icon-bug" />
    </svg>
    <img src={ new URL('../../images/skill.svg', import.meta.url) } />
    <div className='skill'>测试</div>
    <Suspense fallback={<div>Loading...</div>}>
      <BigText>程灵素</BigText>
    </Suspense>
  </React.StrictMode>
)
