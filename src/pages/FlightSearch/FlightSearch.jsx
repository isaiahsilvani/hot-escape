import React, { useState } from 'react';
import SearchPlace from '../../components/SearchPlace/SearchPlace'
import * as flightsAPI from '../../services/flightService'
import styles from './FlightSearch.module.css'

export default function FlightSearch(props) {
  let today = new Date;
  today = today.toISOString().split('T')[0];
  const [flightResults, setFlightResults] = useState({});
  const [originPlace, setOriginPlace] = useState({
    code: '',
    place: '',
  })
  const [destinationPlace, setDestinationPlace] = useState({
    code: '',
    place: '',
  })
  const [flightDate, setFlightDate] = useState(today)

  const handleFlightsSearch = async () => {
    const flightData = {originPlace, destinationPlace, flightDate}
    const flightResults = await flightsAPI.searchFlights(flightData)
    setFlightResults(flightResults)
  }

  return ( 
    <div className={styles.box}>

      <SearchPlace 
          title="Origin Place" 
          selectPlace={setOriginPlace}
      />
      <div className={styles.flightDate}>
        <label htmlFor="flightDate">Date of Departure</label><br />
        <input 
          type='date' 
          name='flightDate'
          value={flightDate}
          onChange={(e)=>setFlightDate(e.target.value)}
        />
      </div>
      <SearchPlace 
        title="Destination Place" 
        selectPlace={setDestinationPlace}
      />
      <button onClick={handleFlightsSearch}>Search Flights</button>
      { originPlace.code && 
        <p>
          Origin Code: {originPlace.code}<br />
          Origin Place: {originPlace.place}
        </p>
      }
      { destinationPlace.code && 
        <p>
          Destination Code: {destinationPlace.code}<br />
          Destination Place: {destinationPlace.place}
        </p>
      }
      <div className={styles.flightResults}>
        <ul>
          {flightResults.Carriers?.length ? 'Map them' : 'No Results'}
        </ul>
      </div>
    </div>
    );
}
 