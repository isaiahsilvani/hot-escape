import tokenService from "./tokenService"
const BASE_URL = '/chatroom/'

export function createRoom(data) {
    console.log(data)
    return fetch(BASE_URL, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            Authorization: "Bearer " + tokenService.getToken()
        },
        body: JSON.stringify(data)
    }, {mode: "cors"})
    .then(res => res.json())
}

export function fetchRoomData(room) {
    console.log('test chat hit', room)
    return fetch(BASE_URL + room, {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            Authorization: "Bearer " + tokenService.getToken()
        }
    }, {mode: "cors"})
    .then(res => res.json())
}

export function storeMessage(data) {
    console.log('store message hit', data)
    return fetch(BASE_URL + 'messages', {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            Authorization: "Bearer " + tokenService.getToken()
        },
        // the routers connection when I remove JSON.stringify(data) from body
        body: JSON.stringify(data)
    }, {mode: "cors"})
    .then(res => res.json())
}

export function getRooms(room) {
    console.log('test chat hit', room)
    return fetch(BASE_URL, {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            Authorization: "Bearer " + tokenService.getToken()
        }
    }, {mode: "cors"})
    .then(res => res.json())
}