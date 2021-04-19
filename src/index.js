import _ from 'lodash'
import './styles/index.scss'

function componnet() {
    const element = document.createElement('div')
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    element.classList.add('danger')
    return element
}

document.body.appendChild(componnet())