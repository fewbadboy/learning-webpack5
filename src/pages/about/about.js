import '@/styles/about.scss'
import _ from 'lodash'

document.getElementById('about').innerHTML =  _.join(['Hello', 'About'], ' ')
document.getElementById('about').onclick = function(){
    location.pathname = ''
}
