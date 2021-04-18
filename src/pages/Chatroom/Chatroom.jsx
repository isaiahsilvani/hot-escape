import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

const Chat = ({ props }) => {

    const params = useLocation()

    useEffect(() => {
        const { name, room } = queryString.parse(params.search)
        console.log(name, room)
    })
    return ( 
        <h1>Chat</h1>
     );
}
 
export default Chat;