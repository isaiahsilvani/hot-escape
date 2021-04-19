import tokenService from "./tokenService"
const BASE_URL = '/chatroom/'

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