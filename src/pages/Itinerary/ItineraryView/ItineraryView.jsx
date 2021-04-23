import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import * as itineraryAPI from '../../../services/itineraryService';
import FlightSection from '../../Flights/FlightSection/FlightSection';
import ItineraryNav from '../../../components/ItineraryNav/ItineraryNav'
import HotelSection from '../../Hotels/HotelSection/HotelSection'
import AttractionSection from '../../Attractions/AttractionSection/AttractionSection'
import RentalSection from '../../Rentals/RentalSection/RentalSection'
import ItineraryDetails from '../../../components/ItineraryDetails/ItineraryDetails'
import EditItinerary from '../EditItinerary/EditItinerary'
import './ItineraryView.css'

export default function ItineraryView(props) {
  const {id} = useParams();
  const [itineraryData, setItineraryData] = useState({})
  const [display, setDisplay] = useState('flights');
  const [editItin, setEditItin] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const itineraryData = await itineraryAPI.getOne(id);
      setItineraryData(itineraryData)
    }
    fetchData();
  }, []);

  const displaySwitch = () => {
    switch(display) {
      case 'hotels':
        return (
          <main>
            <HotelSection setItineraryData={setItineraryData} itinID={id} itinData={itineraryData} />
          </main>)
      case 'attractions':
        return (
          <main>
            <AttractionSection setItineraryData={setItineraryData} itinID={id} itinData={itineraryData} />
          </main>
        )
        case 'rentals':
        return (
          <main>
            <RentalSection setItineraryData={setItineraryData} itinID={id} itinData={itineraryData} />
          </main>
        )
      case 'flights':
      default:
        return <FlightSection itinID={id} setItineraryData={setItineraryData} itinData={itineraryData} />
    }
  }
      
  return (
    <>
      {editItin ? <EditItinerary setItineraryData={setItineraryData} itinData={itineraryData} setEditItin={setEditItin} /> 
      : <ItineraryDetails itinData={itineraryData} setEditItin={setEditItin} /> }
      <ItineraryNav switchDisplay={setDisplay} display={display} />
      {displaySwitch()}
    </>
  )
};