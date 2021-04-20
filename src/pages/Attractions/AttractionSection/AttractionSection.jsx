import React, { useState, useEffect } from 'react';
import AttractionSearch from '../AttractionSearch/AttractionSearch'
import AttractionList from '../AttractionList/AttractionList'
import { useParams } from 'react-router-dom'

import './AttractionSection.css'

export default function AttractionSection(props) {
    const [display, setDisplay] = useState('list');
    const [attractionId] = useState();
  
    const displaySwitch = () => {
      switch(display) {
        case 'search':
          return <AttractionSearch {...props}/>
        case 'list':
        default:
          return <AttractionList attractions={props.itinData.attractions} {...props} />
      }
    }
  
    return (
      <>
        <div className='section-nav'>
          <div onClick={()=>setDisplay('list')}>
            My Attractions</div>
          <div onClick={()=>setDisplay('search')}>
            Add Attractions</div>
        </div>
        {displaySwitch(attractionId)}
      </>
    )
  }