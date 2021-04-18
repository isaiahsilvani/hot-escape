import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import * as itineraryAPI from '../../../services/itineraryService';
import FlightSection from '../../Flights/FlightSection/FlightSection';
import ItineraryNav from '../../../components/ItineraryNav/ItineraryNav'
export default function ItineraryView({user}) {
  const {id} = useParams();
  const [itineraryData, setItineraryData] = useState({})
  const [display, setDisplay] = useState('flights');

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const itineraryData = await itineraryAPI.getOne(id);
      console.log(itineraryData)
      setItineraryData(itineraryData)
    }
    fetchData();
  }, []);

  const displaySwitch = () => {
    switch(display) {
      case 'hotels':
        return (
          <main>
            <h1>Hotels</h1>
          </main>)
      case 'attractions':
        return (
          <main>
            <h1>Attractions</h1>
          </main>
        )
      case 'flights':
      default:
        return <FlightSection flights={itineraryData.flights} />
    }
  }

  return (
    <>
    <main>
      <h1>Escape from {itineraryData.origin} to {itineraryData.destination}</h1>
      <p>{id}<br/>
      Origin: {itineraryData.origin} <br />
      Destination: {itineraryData.destination}</p>
    </main>
    <ItineraryNav switchDisplay={setDisplay} display={display} />
    {displaySwitch()}
    </>
  )
};