import "@babel/polyfill"
import random from './console';

const obj = {
    name: 'tianyuqi'
}

if (module.hot) {
    module.hot.accept('./console.js', function () {
        random()
    })
}