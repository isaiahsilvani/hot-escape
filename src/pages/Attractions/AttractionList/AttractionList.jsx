import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from '../../../components/UserContext'
import * as attractionsAPI from '../../../services/attractionService'

// export default function AttractionList ({itinData}) {
//     return (
//       <>
//         <h1>Attraction List</h1>
//         {itinData.attractions?.map(attraction => (
//           <h1>{attraction.name}</h1>
//         ))}
//       </>
//     )
// }

export default function AttractionList ({attractions}) {
    const user = useContext(UserContext);
      
    return (
      <>
        <h1>Attraction List</h1>
        {attractions.length ?
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {attractions.map(attraction => (
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>{attraction.name}</td>
                  <td>{attraction.location}</td>
                  {/* <button className="delete-btn">
            delete</button> */}
                </tr>
              ))}
            </tbody>
          </table>
        
        : <p>No attractions yet</p>}
      </>
    );
  }
  