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

  handleChange = e => {
    const formData = {...this.state.formData, [e.target.name]: e.target.value};
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()
    });
  };

  render() { 
    return ( 
      <>
        <div>{this.state.places.map((place, idx) =>
          <p key={idx}>
            {place.PlaceName}
          </p>)}
        </div>
        <button onClick={this.sendRequest}>Send</button>
      </>
     );
  }
}
 
export default SearchPlace;