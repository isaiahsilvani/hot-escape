import React, { Component } from 'react';
import * as flightAPI from '../../services/flightService'

class SearchPlace extends Component {
  state = { 
    places: [],
    formData: {
      query: '',
    }
  }

  sendRequest = async () => {
    const query = "Miami";
    const results = await flightAPI.searchPlace(query);
    console.log(query, results.Places);
    this.setState({places: results.Places})
  }

  handleChange = (e) => {
    const formData = {
      ...this.state.formData, [e.target.name]: e.target.value
    }
    this.setState({ formData })
  }

  render() { 
    const { test } = this.state.formData
    return ( 
      <>
        <div>{this.state.places.map((place, idx) =>
          <p key={idx}>
            {place.PlaceName}
          </p>)}
        </div>
        <input 
            value={this.state.formData.query} 
            type="text" 
            name="query"
            onChange={this.handleChange}
          />
        <button onClick={this.sendRequest}>Send</button>
      </>
     );
  }
}
 
export default SearchPlace;