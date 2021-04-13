import tokenService from "./tokenService"
const BASE_URL = '/flights'

export function create(flightsData) {
    return fetch(BASE_URL, {
        headers: { Authorization: "Bearer " + tokenService.getToken(), 'content-type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(flightsData)
    })
    .then(res => res.json())
}

