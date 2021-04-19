import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import * as itineraryAPI from '../../../services/itineraryService';
import FlightSection from '../../Flights/FlightSection/FlightSection';
import ItineraryNav from '../../../components/ItineraryNav/ItineraryNav'
import HotelSection from '../../Hotels/HotelSection/HotelSection'
import AttractionSection from '../../Attractions/AttractionSection/AttractionSection'

export default function ItineraryView({user}) {
  const {id} = useParams();
  const [itineraryData, setItineraryData] = useState({})
  const [display, setDisplay] = useState('flights');

  useEffect(() => {
    async function fetchData() {
      // get itinerary data based on ID parameter
      const itineraryData = await itineraryAPI.getOne(id);
      setItineraryData(itineraryData)
    }
    fetchData();
  }, []);

  function setFlight(flights) {
    setItineraryData({...itineraryData, flights})
  }

  const displaySwitch = () => {
    switch(display) {
      case 'hotels':
        return (
          <main>
            <h1>Hotels</h1>
            <HotelSection setItineraryData={setItineraryData} itinID={id} itinData={itineraryData} />
          </main>)
      case 'attractions':
        return (
          <main>
            <h1>Attractions</h1>
            <AttractionSection setItineraryData={setItineraryData} itinID={id} itinData={itineraryData} />
          </main>
        )
      case 'flights':
      default:
        return <FlightSection itinID={id} setItineraryData={setItineraryData} itinData={itineraryData} />
    }
  }
      
  return (
    <>
    <main>
      <h1>
        Escape from {itineraryData.origin} to {itineraryData.destination}
      </h1>
      <p>
        {itineraryData.startDate?.split('T')[0].replaceAll('-','/')} to {itineraryData.endDate?.split('T')[0].replaceAll('-','/')}
        <br/>
      Origin: {itineraryData.origin} <br />
      Destination: {itineraryData.destination}</p>
    </main>
    <ItineraryNav switchDisplay={setDisplay} display={display} />
    {displaySwitch()}
    
    </>
  )
};