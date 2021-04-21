import React from 'react';
import styles from './ItineraryDetails.module.css'

export default function ItineraryDetails({itinData}) {

  const departure = new Date(itinData.startDate).toLocaleDateString();
  const returnDate = new Date(itinData.endDate).toLocaleDateString();

  return (
    // <main>
      <div className={`whiteBox ${styles.twoColumns}`}>
        <div className={styles.colOne}>
          <img src={itinData.imageSrc} />
        </div>
        <div className={styles.colTwo}>
            <h2>Escape from {itinData.origin} to {itinData.destination}</h2>
            <p>
              Starts on <strong>{departure}</strong>
            </p>
            <p>
              Ends on <strong>{returnDate}</strong>
            </p>
        
        </div>
      </div>
    // </main>
  )
}