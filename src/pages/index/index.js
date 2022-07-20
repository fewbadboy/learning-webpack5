import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import _ from 'lodash'
import { Say } from '@/main'

import '../../icons'

import '@/styles/index.scss'
import img from '@/images/who.png'
console.log(_.head(['head', 'tail']))
function component () {
  const element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.classList.add('red')

  const btn = document.createElement('button')
  btn.innerHTML = 'Click then check the console!'
  btn.onclick = e => import('@/print').then(module => {
    const print = module.default
    print()
    console.log(e)
  })
  element.append(btn)

  return element
}
document.body.appendChild(component())
console.log(Say({name: 'JS'}))
const app = ReactDOMClient.createRoot(document.getElementById('app'))
app.render(
  <React.StrictMode>
    <div>
      { _.join(['Hello', 'Index', process.env.NODE_ENV], ' ') }
    </div>
    <svg>
      <use xlinkHref="#icon-bug" />
    </svg>
    <img src={ img } />
    <img src={ new URL('../../images/skill.svg', import.meta.url) } />
    <div className='skill'>测试</div>
  </React.StrictMode>
)
