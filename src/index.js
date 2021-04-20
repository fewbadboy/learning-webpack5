import _ from 'lodash'
import './styles/index.scss'

import printMe from './print.js';

import csv from './Data/data.csv'
import xml from './Data/data.xml'
import yaml from './Data/data.yaml'
import json from './Data/data.json5'
console.log(yaml.title); // output `YAML Example`
console.log(yaml.owner.name); // output `Tom Preston-Werner`

console.log(json.title); // output `JSON5 Example`
console.log(json.owner.name); // output `Tom Preston-Werner`

console.log(csv)
console.log(xml)
function componnet() {
    const element = document.createElement('div')
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    element.classList.add('danger')
    element.onclick = printMe
    return element
}

document.body.appendChild(componnet())