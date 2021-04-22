import React from 'react';
import { Link } from 'react-router-dom'
import styles from './WelcomePage.module.css'
import splashImg from '../../img/sweet-escape.jpg'

export default function WelcomePage(props) {
  return (
    <main>
      <div className={styles.welcomePage}>
        <h1>Welcome to Hot Escape</h1>
        <div className={styles.twoColumns}>
          <div className={styles.colOne}>
            <img src={splashImg} className={styles.welcomeImg} alt="Welcome to Hot Escape" />
          </div>
          <div className={styles.colTwo}>
          <h3>Use Hot Escape to plan your next vacation!</h3> 
          <ol>
            <li>Create an Itinerary for each of your vacation plans</li>
            <li>Search for Flights and add them to your Itinerary</li>
            <li>Add your Hotels, Attractions and Rentals</li>
            <li>Chat with others about their Vacations</li>
          </ol>
          </div>
        </div>
      <h3><Link to='/itinerary/new'>Plan Your Next Escape!</Link></h3>
    </div>
  </main>

  );
}