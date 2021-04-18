import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from '../../../components/UserContext'
import * as hotelsAPI from '../../../services/hotelService'

export default function HotelList({hotels}) {

  return (
    hotels.map(hotel => (
      <h1>{hotel.name}</h1>
      // <h1>{hotel.room}</h1>,
      // <h1>{hotel.checkInDate}</h1>,
      // <h1>{hotel.checkOutDate}</h1>,
      // <h1>{hotel.price}</h1>
    ))
  )
}


// export default function HotelList({hotels}) {

//     return ( hotels
//         )
// }

// function HotelList({ user, hotel, handleDeleteHotel }) {
//   return(
//     <>
//       <div className=" card">
//         <div className="card-content">
//           <span className="card-title activator grey-text text-darken-4">{hotel.name}<i className="material-icons right">more_vert</i></span>
          
//         </div>
//         <div className="card-reveal">
//           <span className="card-title grey-text text-darken-4">{hotel.name}<i className="material-icons right">close</i></span>
//           <h6>Added By:  {itinerary.owner}</h6>
//           <>
//             <button type="submit" className="btn red" onClick={() => handleHotel(hotel._id)}>
//               <i className="material-icons left">delete</i>    
//               Delete Hotel
//             </button>
//               <Link 
//                 className="btn yellow black-text"
//                 to={{
//                   pathname: '/editTV',
//                   state: {hotel}
//                 }}
//               >
// 								<i className="material-icons left">build</i>
// 	              Edit Hotel
//               </Link>
//             </>
//           }
//         </div>
//       </div>
//     </>
//   ) 
// }
