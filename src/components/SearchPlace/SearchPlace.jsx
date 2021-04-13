import React, { Component } from 'react';
import * as flightAPI from '../../services/flightService'

class SearchPlace extends Component {
  state = { 
    formData: {
      query: '',
    }
  }

  sendRequest = () => {
    const query = "Miami"
    flightAPI.searchPlace(query);
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
        <button onClick={this.sendRequest}>Send</button>
      </>
     );
  }
}
 
export default SearchPlace;