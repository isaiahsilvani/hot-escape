import React, { Component } from 'react';
import SearchPlace from '../../components/SearchPlace/SearchPlace'
import * as flightsAPI from '../../services/flightService'

class FlightSearch extends Component {
    state = { 
      flightResults: [],
      originCode: '',
      destinationCode: '',
      flightDate: '',
     }

    setOriginPlace = (placeId) => {
      this.setState({originCode: placeId})
    }

    setDestinationPlace = (placeId) => {
      this.setState({destinationCode: placeId})
    }
    // handleFlightSearch = async newFlightData => {
    //     console.log('handleFlightSearch hit')
    //     const flights = await flightsAPI.create(newFlightData)
    //     console.log(flights)
    //     this.setState(state => ({
    //         flights: flights
    //     }))
    // }

    render() { 
      return ( 
        <div className="box">

          <SearchPlace 
              title="Origin Place" 
              selectPlace={this.setOriginPlace}
          />
            <SearchPlace 
              title="Destination Place" 
              selectPlace={this.setDestinationPlace}
            />
        </div>
        );
    }
}
 
export default FlightSearch;