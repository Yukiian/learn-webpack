import random from './console'

if(module.hot){
    module.hot.accept('./console.js',function(){
        random()
    })
}