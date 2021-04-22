import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import * as itineraryAPI from '../../../services/itineraryService';
import FlightSection from '../../Flights/FlightSection/FlightSection';
import ItineraryNav from '../../../components/ItineraryNav/ItineraryNav'
import HotelSection from '../../Hotels/HotelSection/HotelSection'
import AttractionSection from '../../Attractions/AttractionSection/AttractionSection'
import RentalSection from '../../Rentals/RentalSection/RentalSection'
import ItineraryDetails from '../../../components/ItineraryDetails/ItineraryDetails'
import EditItinerary from '../EditItinerary/EditItinerary'
import { UserContext } from '../../../components/UserContext'
import './ItineraryView.css'

export default function ItineraryView(props) {
  const {id} = useParams();
  const user = useContext(UserContext)
  const [itineraryData, setItineraryData] = useState({})
  const [display, setDisplay] = useState('flights');
  const [editItin, setEditItin] = useState(false)

  useEffect(() => {
    async function fetchData() {
      // get itinerary data based on ID parameter
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
      : 
      <ItineraryDetails itinData={itineraryData} setEditItin={setEditItin} /> }
   
    {/* <main>
      <h1>
        Escape from {itineraryData.origin} to {itineraryData.destination}
      </h1>
      <p>
        {itineraryData.startDate?.split('T')[0].replaceAll('-','/')} to {itineraryData.endDate?.split('T')[0].replaceAll('-','/')}
        <br/>
      Origin: {itineraryData.origin} <br />
      Destination: {itineraryData.destination}</p>
    </main> */}
    <ItineraryNav switchDisplay={setDisplay} display={display} />
    {displaySwitch()}
    
    </>
  )
};