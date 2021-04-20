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

export function test() {
    console.log('test chat hit')
    return fetch(BASE_URL, {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            Authorization: "Bearer " + tokenService.getToken()
        }
    }, {mode: "cors"})
    .then(res => res.json())
}