import React, { useState, useEffect } from 'react';
import AttractionSearch from '../AttractionSearch/AttractionSearch'
import AttractionList from '../AttractionList/AttractionList'
import AttractionEdit from '../AttractionEdit/AttractionEdit'
import { useParams } from 'react-router-dom'

import './AttractionSection.css'

export default function AttractionSection(props) {
    const [display, setDisplay] = useState('list');
    const [attractionId, setAttractionId] = useState(0);
  
    const displaySwitch = () => {
      switch(display) {
        case 'search':
          return <AttractionSearch {...props}/>
        case 'view':
          return <AttractionEdit setDisplay={setDisplay} attractionId={attractionId} {...props} />
      case 'list':
        default:
          return <AttractionList setDisplay={setDisplay} setAttractionId={setAttractionId} {...props} />
      }
    }
  
    return (
      <main>
        <div className='section-nav'>
          <div onClick={()=>setDisplay('list')}>
            My Attractions</div>
          <div onClick={()=>setDisplay('search')}>
            Add Attractions</div>
        </div>
        {displaySwitch(attractionId)}
      </main>
    )
  }