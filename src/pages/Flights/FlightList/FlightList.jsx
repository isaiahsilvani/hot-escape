import React, {useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { UserContext } from '../../../components/UserContext'
import * as flightsAPI from '../../../services/flightService'

export default function FlightList (props) {
  const [flights, setFlights] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const flightsData = await flightsAPI.getAll(user._id);
      setFlights(flightsData)
      // ...
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  return (
    <>
      <h1>Flight List</h1>
      <h2>{user._id}</h2>
      {flights.length === 0 ? 'no flights' : 'flights!'}
    </>
  );
}