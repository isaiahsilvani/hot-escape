import React, { Component } from 'react';
import * as flightAPI from '../../services/flightService'
import styles from './SearchPlace.module.css'

class SearchPlace extends Component {
  state = { 
    places: [],
    formData: {
      query: '',
    }
  }
  // purpose of this component is to take query in state  and return a selectable list
  // of valid places to go to
  sendRequest = async () => {
    const query = this.state.formData.query;
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

  handlePlaceChange = e => {
    console.log(e.target.value);
    const formData = {
      query: e.target.value
    }
    this.setState({ formData })
  }
  render() { 
    const {places} = this.state;
    return ( 
      <div className={styles.box}>
        <h3>{this.props.title}</h3>
        <input 
            value={this.state.formData.query} 
            type="text" 
            name="query"
            onChange={this.handleChange}
            />
        <button onClick={this.sendRequest}>Send</button>
        {this.state.places.length ?
          <select
            size={this.state.places.length > 6 ? 6 : places.length}
            name="placeList"
            onChange={this.handlePlaceChange}
          >
          {this.state.places.map((place, idx) =>
            <option 
              key={idx}
              onClick={() => this.props.selectPlace(place.PlaceId, place.PlaceName)}
            >
              {place.PlaceName}
            </option>)}
          </select>
        :
        ''
        } 
      </div>
     );
  }
}
 
export default SearchPlace;