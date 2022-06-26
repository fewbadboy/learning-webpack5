import _ from 'lodash'
import '@/styles/index.scss'

import printMe from '@/common/print.js'

import csv from '@/Data/data.csv'
import xml from '@/Data/data.xml'
import yaml from '@/Data/data.yaml'
import json from '@/Data/data.json5'
console.log(yaml.title) // output `YAML Example`

console.log(json.title) // output `JSON5 Example`

console.log(csv)
console.log(xml)

localStorage.setItem('token', 'auth9527')
console.log(process.env.BASE_URL)

console.log(_.join(['Hello', 'webpack'], ' '))

setTimeout(() => {
  printMe()
}, 10000)
