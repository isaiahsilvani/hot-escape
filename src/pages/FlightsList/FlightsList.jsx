import React, { Component } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm'
import * as flightsAPI from '../../services/flights-api-service'
//import * as puppyAPI from '../../services/puppies-api';

class SearchFlights extends Component {
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
            <SearchForm handleFlightSearch={this.handleFlightSearch}/>
            </>
         );
    }
}
 
export default SearchFlights;