import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../../../components/UserContext'
import * as itineraryAPI from '../../../services/itineraryService';

const ItineraryList = (props) => {
    const [itineraryList, setItineraryList] = useState([]);
    const user = useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
          // You can await here
          const itineraryList = await itineraryAPI.getAll(user._id);
          console.log(itineraryList)
          setItineraryList(itineraryList)
          // ...
        }
        fetchData();
      }, []); // Or [] if effect doesn't need props or state

    return (
        <main>
            <div>
                <h3>Itinerary list page</h3>
                {itineraryList.length ?
                    
                    itineraryList.map(itin => (
                        <p>
                            <Link to={'/itinerary/' + itin._id} >Link</Link>
                        </p>
                    ))
                : 'no list :('}
            </div>
        </main>
     );
}
 
export default ItineraryList;