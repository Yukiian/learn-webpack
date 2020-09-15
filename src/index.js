// import "@babel/polyfill"
// import random from './console';

// const obj = {
//     name: 'tianyuqi'
// }

// if (module.hot) {
//     module.hot.accept('./console.js', function () {
//         random()
//     })
// }

import React, { Component } from "react";
import ReactDom from 'react-dom'

class App extends Component {
  render() {
    return <div>hello world!</div>;
  }
}

ReactDom.render(<App/>,document.getElementById("root"));