import { PromiseProvider } from 'mongoose';
import React, {useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { UserContext } from '../../../components/UserContext'
import * as flightsAPI from '../../../services/flightService'
import './FlightList.css'

export default function FlightList 
  ({flights, itinID, setMessage, setItineraryData, setDisplay, controls}) {

  const user = useContext(UserContext);
  const [selectedFlights, setSelectedFlights] = useState([])

  const toggleFlight = (i) => {
    const selected = (selectedFlights.some(flight => 
      flight.flightID === flights[i].flightID)) ?
      selectedFlights.filter(flight => 
        flight.flightID !== flights[i].flightID) :
      [...selectedFlights, flights[i]];
    setSelectedFlights(selected)
  }

  const addFlights = async () => {
    try {
      const result = await flightsAPI.addFlights(itinID, selectedFlights)
      setItineraryData(result)
      setDisplay('list')
    } catch (error) {
      setMessage(error.message)
    }
  } 
  
  const deleteFlights = async () => {
    try {
      const result = await flightsAPI.deleteFlights(itinID, selectedFlights)
      setItineraryData(result)
      setDisplay('list')
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <>
      <h1>Flight List</h1>
      {controls === 'add' && <button onClick={addFlights}>Add Selected</button>}
      {controls === 'del' && <button onClick={deleteFlights}>Remove Selected</button>}
      {flights?.length ?
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Airline</th>
              <th>Origin</th>
              <th>Airport</th>
              <th>Destination</th>
              <th>Airport</th>
              <th>Departure Time</th>
              <th>Direct</th>
              <th>Price</th>
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, idx) => (
              <tr key={idx}>
                <td><input type="checkbox" autoComplete='off' onClick={()=> toggleFlight(idx)}/></td>
                <td>{flight.airline}</td>
                <td>{flight.originCity}</td>
                <td>{flight.originStation}</td>
                <td>{flight.destinationCity}</td>
                <td>{flight.destinationStation}</td>
                <td>{flight.flightDateTime.split('T')[1].slice(0,5)}</td>
                <td>{flight.direct ? 'Yes' : 'No'}</td>
                <td>{flight.lowestPrice}</td>
                <td>{flight.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      
      : <p>No flights found</p>}
    </>
  );
}