import tokenService from "./tokenService"
const BASE_URL = '/messages/'

export function storeMsg(data) {
    console.log('send message service hit', data)
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

export function createRoom(data) {
    console.log(data)

}