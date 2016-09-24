import React, { Component } from 'react';
import { render } from 'react-dom';

class Trial extends Component {
  // constructor() {
  //   super();
  // }
  render() {
    return (<h1>Hello World</h1>);
  }
}

render(<Trial />, document.getElementById('main'));

// const HelloWorld = () => (
//   <div>Hi</div>
// );

// export default HelloWorld;
