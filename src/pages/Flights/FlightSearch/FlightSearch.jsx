import React, { useState } from 'react'
import SearchPlace from '../../../components/SearchPlace/SearchPlace'
import * as flightsAPI from '../../../services/flightService'
import styles from './FlightSearch.module.css'
import { useParams } from 'react-router-dom'

export default function FlightSearch(props) {
  const {id} = useParams();
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

  const addFlight = () => {
    flightResults.itinID = id
    flightsAPI.addFlight(flightResults)
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
        <div className={styles.flightList}>
          <div className={styles.flightPrice}>
            {flightResults.Carriers?.length ?  
            <>
              <p>Min Flight Price: {flightResults.Quotes[0].MinPrice}</p>
              <button onClick={addFlight}>Add Flight</button>
            </> : 'No Flights Listed'}
          </div>
          {flightResults.Carriers?.length &&
          // reverse order so origin and destination appear correctly

            flightResults.Places.reverse().map((place, idx) => 
            
              <div className={styles.placeCard}key={idx}>
                <h3>Country: {place.CountryName}</h3>
                <h3>City: {place.CityName}</h3>
                <h3>Type: {place.Type}</h3>
                <h3>Airport: {place.Name}</h3>
              </div>
            
            )
            }
        </div>
      </div>
    </div>
    );
}
 