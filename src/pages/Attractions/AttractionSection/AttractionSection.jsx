import React, { useState } from 'react';
import AttractionSearch from '../AttractionSearch/AttractionSearch'
import AttractionList from '../AttractionList/AttractionList'
import AttractionEdit from '../AttractionEdit/AttractionEdit'

export default function AttractionSection(props) {
    const [display, setDisplay] = useState('list');

    const [attractionId, setAttractionId] = useState(0);

  
    const displaySwitch = () => {
      switch(display) {
        case 'search':
          return <AttractionSearch setDisplay={setDisplay} {...props}/>

        case 'view':
          return <AttractionEdit setDisplay={setDisplay} attractionId={attractionId} {...props} />
      case 'list':
        default:
          return <AttractionList setDisplay={setDisplay} setAttractionId={setAttractionId} {...props} />
      }
    }
  
    return (
      <>
        <div className='section-nav'>
          <div onClick={()=>setDisplay('list')}
          className={display === 'list' ? 'active' : undefined}>
            My Attractions</div>
          <div onClick={()=>setDisplay('search')}
          className={display === 'search' ? 'active' : undefined}>
            Add Attractions</div>
        </div>
        {displaySwitch(attractionId)}
      </>
    )
  }