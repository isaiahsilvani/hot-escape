import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import * as itineraryAPI from '../../../services/itineraryService';

const ItineraryList = ({user}) => {

    const [itineraryList, setItineraryList] = useState([]);
    
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

      function parseDate(date) {
          let dateString = ''
          for (let i = 0; i < date.length; i++) {
              if (date[i] !== 'T') {
                dateString += date[i]
              } else {
                  break;
              }
          }
          dateString = dateString.replace('-', '/')
          dateString = dateString.replace('-', '/')
          return dateString
      }

    return (
        <main>
            <div>
                <h3>Itinerary List Page</h3>
                {itineraryList.length ?
                    
                    itineraryList.map(itin => (
                        <p>
                            <Link to={'/itinerary/' + itin._id} >From {itin.origin} to {itin.destination}</Link><br />
                            <p>{parseDate(itin.startDate)} - {parseDate(itin.endDate)}</p>
                        </p>
                    ))
                : 'no list :('}
            </div>
        </main>
     );
}
 
export default ItineraryList;