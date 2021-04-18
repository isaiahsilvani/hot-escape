import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import * as itineraryAPI from '../../../services/itineraryService';
import FlightSection from '../../Flights/FlightSection/FlightSection';
import ItineraryNav from '../../../components/ItineraryNav/ItineraryNav'

import HotelSearch from '../../Hotels/HotelSearch/HotelSearch'
import AttractionSearch from '../../AttractionSearch/AttractionSearch'
import HotelList from '../../Hotels/HotelList/HotelList'


import AttractionSearch from '../../Attractions/AttractionSearch/AttractionSearch'
import AttractionList from '../../Attractions/AttractionList/AttractionList'

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

  function setFlight(flights) {
    setItineraryData({...itineraryData, flights})
  }

  const displaySwitch = () => {
    switch(display) {
      case 'hotels':
        return (
          <main>
            <h1>Hotels</h1>
            <HotelSearch itinID={id} />
            <HotelList hotels={itineraryData.hotels} />
          </main>)
      case 'attractions':
        return (
          <main>
            <h1>Attractions</h1>
            <AttractionSearch itinID={id} />
            <AttractionList attractions={itineraryData.attractions} />
          </main>
        )
      case 'flights':
      default:
        return <FlightSection setFlight={setFlight} flights={itineraryData.flights} />
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