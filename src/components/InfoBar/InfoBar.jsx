import React from 'react';
import closeIcon from '../../Icons/closeIcon.png'
import onlineIcon from '../../Icons/onlineIcon.png'
import styles from './InfoBar.module.css'

const InfoBar = ({ room }) => {
    return ( 
        <>
        <div className={styles.infoBar}>
            <div className={styles.icons}>
                <div className='leftInnerContainer'>
                    <img className='onlineIcon' src={onlineIcon} alt='online icon'/>
                </div>
                <h2>{room}</h2>
                <div className='rightInnerContainer'>
                    <a href='/'><img src={closeIcon} alt='close icon'/></a>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default InfoBar;