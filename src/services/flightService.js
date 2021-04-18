import tokenService from "./tokenService"
const BASE_URL = '/api/flights/'

export function create(flightsData) {
    return fetch(BASE_URL, {
        headers: { Authorization: "Bearer " + tokenService.getToken(), 'content-type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(flightsData)
    })
    .then(res => res.json())
}

export function searchPlace(query) {
    return fetch(BASE_URL + 'place', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({query})
    }, {mode: "cors"})
    .then(res => res.json())
}

export function searchFlights(flightsData) {
    return fetch(BASE_URL + 'search', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({flightsData})
    }, {mode: "cors"})
    .then(res => res.json())
}

export function addFlight(flightData) {
    return fetch(BASE_URL + 'add', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({flightData})
    }, {mode: "cors"})
    .then(res => res.json())
}

export function getAll(query) {
    console.log('get all flight service hit')
    return fetch(BASE_URL + query, {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            Authorization: "Bearer " + tokenService.getToken()
        }
    }, {mode: "cors"})
    .then(res => res.json())
}