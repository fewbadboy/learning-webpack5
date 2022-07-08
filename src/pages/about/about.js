import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import _ from 'lodash'

import '../../icons'

import '@/styles/index.scss'

function component () {
  const element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.classList.add('danger')
  return element
}

document.body.appendChild(component())

const app = ReactDOMClient.createRoot(document.getElementById('about'))
app.render(
  <React.StrictMode>
    <div>
      { _.join(['Hello', 'About'], ' ') }
    </div>
    <img src={ new URL('../../images/puma.png', import.meta.url) } />
  </React.StrictMode>
)