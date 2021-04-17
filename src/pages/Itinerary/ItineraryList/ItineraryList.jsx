import React, { useEffect, useState } from 'react';
import * as itineraryAPI from '../../../services/itineraryService';

const ItineraryList = () => {

    const [itineraryList, setItineraryList] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
          // You can await here
          const itineraryList = await itineraryAPI.getAll();
          setItineraryList(itineraryList)
          // ...
        }
        fetchData();
      }, []); // Or [] if effect doesn't need props or state

    return (
        <main>
            <div>
                <h3>Itinerary list page</h3>
                {itineraryList.length ? 'map' : 'no list :('}
            </div>
        </main>
     );
}
 
export default ItineraryList;