import React from 'react';
import request from 'superagent';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    request
      .head('/city')
      .query({ city: this.state.value })
      .end(
        (err, res) => {
          if (!err) {
            console.log('City searched', res);
          } else {
            console.log('Something wrong happened', err);
          }
        }
      );
  }

  render() {
    return (
      <form className="col s12" onSubmit={this.handleSubmit}>
        <div className="input-field col s6">
          <input
            placeholder="City Name" id="location"
            type="text" className="validate"
            value={this.state.value} onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}


export default Search;
