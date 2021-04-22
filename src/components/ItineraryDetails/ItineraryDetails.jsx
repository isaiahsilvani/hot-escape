import React from 'react';
import { Link } from 'react-router-dom'
import styles from './ItineraryDetails.module.css'

export default function ItineraryDetails({itinData, setEditItin}) {

  const departure = new Date(itinData.startDate).toLocaleDateString();
  const returnDate = new Date(itinData.endDate).toLocaleDateString();

  return (
    // <main>
      <div className={styles.box}>
        <div className={styles.twoColumns}>
          <div className={styles.colOne}>
            <img src={itinData.imageSrc} />
          </div>
          <div className={styles.colTwo}>
            <h1>Escape from {itinData.origin} to {itinData.destination}</h1>
            <p>
              Starts <strong>{departure}</strong><br />
              Ends <strong>{returnDate}</strong><br />
              
            </p>
            <Link to='#' onClick={()=>setEditItin(true)}>Edit Details</Link>
          </div>
        </div>
      </div>
    // </main>
  )
}