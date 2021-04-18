import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import * as itineraryAPI from '../../../services/itineraryService';
import FlightSection from '../../Flights/FlightSection/FlightSection';

export default function ItineraryView({user}) {
  const {id} = useParams();
  const [itineraryData, setItineraryData] = useState({})

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const itineraryData = await itineraryAPI.getOne(id);
      console.log(itineraryData)
      setItineraryData(itineraryData)
    }
    fetchData();
  }, []);

  return (
    <>
    <main>
      <h1>{id}</h1>
      <p>Origin: {itineraryData.origin}</p>
      <p>Destination: {itineraryData.destination}</p>
    </main>
    <FlightSection flights={itineraryData.flights} />
    </>
  )
};