import React, { Component } from 'react';

export default class Search extends Component {
  constructor(){
    super();
    this.state = {
      value: ''
    }

  }

  handleChange(event) {
    this.setState({value: this.event.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSearch(this.state.value);

    this.getDOMNode().querySelector('input').blur();
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="currentweatherform">
          <input  name="city" type="text" className="validate" placeholder="City Name" value={this.state.value} onChange={this.handleChange}/>
          <button type="submit" className="btn" value="Search">Search</button>
        </div>
      </form>
    );
  }
}