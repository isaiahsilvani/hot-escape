import React, { useEffect, useState } from 'react';
import * as itineraryAPI from '../../../services/itineraryService';

const ItineraryList = () => {

    const [itineraryList, setItineraryList] = useState('');

    useEffect(() => {
        // fetch all itinerary items from user from database
        const ItineraryList = itineraryAPI.getAll()
        console.log('useEffect ran')
    })

    return ( 
        <div>
            <h3>Itinerary list page</h3>
        </div>
     );
}
 
export default ItineraryList;