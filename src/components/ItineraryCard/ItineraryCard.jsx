import React from 'react';
import styles from './ItineraryCard.module.css'

export default function ItineraryCard({itinData, center}) {

  const departure = new Date(itinData.startDate).toLocaleDateString();
  const returnDate = new Date(itinData.endDate).toLocaleDateString();

  return (
    // <main>
      <div className={`${styles.box} ${center ? 'm-auto': ''}`}>
        <div className={styles.itinDetails}>
          <img src={itinData.imageSrc} alt=""/>
          <div className={styles.details}>
            <h1>Escape from {itinData.origin} to {itinData.destination}</h1>
            <p>
              Starts <strong>{departure}</strong><br />
              Ends <strong>{returnDate}</strong>
            </p>
          </div>
        </div>
      </div>
    // </main>
  )
}