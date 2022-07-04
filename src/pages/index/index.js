import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import _ from 'lodash'

import '@/styles/index.scss'

function component () {
  const element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.classList.add('danger')
  return element
}

document.body.appendChild(component())

const app = ReactDOMClient.createRoot(document.getElementById('app'))
app.render(
  <React.StrictMode>
    <div>
      { _.join(['Hello', 'webpack'], ' ') }
    </div>
  </React.StrictMode>
)
