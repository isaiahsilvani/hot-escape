import React, {useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { UserContext } from '../../../components/UserContext'
import * as flightsAPI from '../../../services/flightService'
import './FlightList.css'

export default function FlightList ({flights, itinID}) {
  const user = useContext(UserContext);
  const [selectedFlights, setSelectedFlights] = useState('')
  console.log("flightslist", flights);
  
  return (
    <>
      <h1>Flight List</h1>
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
            {flights.map(flight => (
              <tr>
                <td><input type="checkbox" /></td>
                <td>{flight.airline}</td>
                <td>{flight.originCity}</td>
                <td>{flight.originStation}</td>
                <td>{flight.destinationCity}</td>
                <td>{flight.destinationStation}</td>
                <td>{flight.flightDateTime}</td>
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