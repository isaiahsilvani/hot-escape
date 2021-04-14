import React, { Component } from 'react';
import SearchPlace from '../../components/SearchPlace/SearchPlace'
import * as flightsAPI from '../../services/flightService'

class FlightsList extends Component {
    state = { 
        flights: []
     }

    handleFlightSearch = async newFlightData => {
        console.log('handleFlightSearch hit')
        const flights = await flightsAPI.create(newFlightData)
        console.log(flights)
        this.setState(state => ({
            flights: flights
        }))
    }

    render() { 
        return ( 
            <>
                <label htmlFor="origin">Origin Place</label>
                <SearchPlace />
                <label htmlFor="destination">Destination Place</label>
                <SearchPlace />
            </>
         );
    }
}
 
export default FlightsList;