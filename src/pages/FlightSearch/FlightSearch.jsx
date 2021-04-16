import React, { Component } from 'react';
import SearchPlace from '../../components/SearchPlace/SearchPlace'
import * as flightsAPI from '../../services/flightService'
import styles from './FlightSearch.module.css'

class FlightSearch extends Component {
    state = { 
      flightResults: [],
      originFlight: {
        code: '',
        place: '',
      },
      destinationFlight: {
        code: '',
        place: '',
      },
      flightDate: '',
     }

    setOriginPlace = (placeId, placeName) => {
      const originFlight = {
        code: placeId,
        place: placeName,
      }
      this.setState({originFlight})
    }

    setDestinationPlace = (placeId, placeName) => {
      const destinationFlight = {
        code: placeId,
        place: placeName,
      }
      this.setState({destinationFlight})
    }

    handleChange = e => {
      this.setState({flightDate: e.target.value})
    }

    handleFlightsSearch = async () => {
      const flightResults = await flightsAPI.searchFlights(this.state)
      this.setState({flightResults})
    }


    render() { 
      const {flightResults, originFlight, destinationFlight} = this.state;
      return ( 
        <div className={styles.box}>

          <SearchPlace 
              title="Origin Place" 
              selectPlace={this.setOriginPlace}
          />
          <div className={styles.flightDate}>
            <label htmlFor="flightDate">Date of Departure</label><br />
            <input 
              type='date' 
              name='flightDate' 
              onChange={this.handleChange}
            />
          </div>
          <SearchPlace 
            title="Destination Place" 
            selectPlace={this.setDestinationPlace}
          />
          <button onClick={this.handleFlightsSearch}>Search Flights</button>
          { originFlight.code && 
            <p>
              Origin Code: {originFlight.code}<br />
              Origin Place: {originFlight.place}
            </p>
          }
          { destinationFlight.code && 
            <p>
              Destination Code: {destinationFlight.code}<br />
              Destination Place: {destinationFlight.place}
            </p>
          }
          <div className={styles.flightResults}>
            <ul>
              {flightResults.length ? 
                'Map them' :
                'No Results'}
            </ul>
          </div>
        </div>
        );
    }
}
 
export default FlightSearch;