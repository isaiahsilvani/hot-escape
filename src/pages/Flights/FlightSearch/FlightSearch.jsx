import React, { useState } from 'react'
import SearchPlace from '../../../components/SearchPlace/SearchPlace'
import * as flightsAPI from '../../../services/flightService'
import styles from './FlightSearch.module.css'
import FlightList from '../FlightList/FlightList'

import { useParams } from 'react-router-dom'

export default function FlightSearch(props) {
  const [flightResults, setFlightResults] = useState([]);
  const [originPlace, setOriginPlace] = 
    useState({ code: '', place: '' })
  const [destinationPlace, setDestinationPlace] = 
    useState({ code: '', place: '' })
  const [flightDate, setFlightDate] = useState(props.itinData.startDate.split('T')[0])
  const [message, setMessage] = useState('')

  function getToday() {
    const today = new Date;
    return today.toISOString().split('T')[0];
  }

  const handleFlightsSearch = async () => {
    const flightData = {originPlace, destinationPlace, flightDate}
    if (!originPlace.code || ! destinationPlace.code) {
      return setMessage('Please search for and select your origin and destination')
    }
    try {
      const results = await flightsAPI.searchFlights(flightData)
      const flightResults = results.Quotes?.map(quote => {
        return {
          lowestPrice: quote.MinPrice,
          direct: quote.Direct,
          airline: results.Carriers.find(carrier => 
          carrier.CarrierId === quote.OutboundLeg.CarrierIds[0]).Name,
          originStation: results.Places.find(place => 
            place.PlaceId === quote.OutboundLeg.OriginId).Name,
          originCity: results.Places.find(place => 
            place.PlaceId === quote.OutboundLeg.OriginId).CityName,
          destinationStation: results.Places.find(place => 
          place.PlaceId === quote.OutboundLeg.DestinationId).Name,
          destinationCity: results.Places.find(place => 
            place.PlaceId === quote.OutboundLeg.DestinationId).CityName,
          currency: results.Currencies[0].Code,
          flightDateTime: quote.QuoteDateTime,
        }
      })
      if (flightResults) { 
        setFlightResults(flightResults) 
        setMessage('')
      } else setMessage('No results found, please try again')
    } catch (error) { console.log(error)}
  }

  return (
    <>
      <div className={styles.searchInputs}>
        <SearchPlace {...props}
            title="Origin" 
            selectPlace={setOriginPlace}
            value={props.itinData.origin}
        />
        <div className={styles.flightDate}>
          <label htmlFor="flightDate">Date of Departure
          <input 
            type='date' 
            name='flightDate'
            value={flightDate}
            onChange={(e)=>setFlightDate(e.target.value)}
          /></label>
          <button onClick={handleFlightsSearch}>Search Flights</button>
          {message && <p>{message}</p>}
        </div>
        <SearchPlace {...props}
          title="Destination" 
          selectPlace={setDestinationPlace}
          value={props.itinData.destination}
        />
      </div>
      {flightResults.length > 0 &&
      <FlightList {...props} flights={flightResults} />}
    </>
  );
}
 