import tokenService from "./tokenService"
const BASE_URL = '/api/flights/'

// export function create(flightsData) {
//     return fetch(BASE_URL, {
//         headers: { Authorization: "Bearer " + tokenService.getToken(), 'content-type': 'application/json'},
//         method: 'POST',
//         body: JSON.stringify(flightsData)
//     })
//     .then(res => res.json())
// }

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

export function addFlights(itinID, flightsData) {
    if (!flightsData.length) throw new Error('No flights selected');
    return fetch(BASE_URL + itinID, {
        method: "POST",
        headers: { Authorization: "Bearer " + tokenService.getToken(), 'content-type': 'application/json'},
        body: JSON.stringify({flights: flightsData})
    }, {mode: "cors"})
    .then(res => res.json())
}

// export function getAll(query) {
//     console.log('get all flight service hit')
//     return fetch(BASE_URL + query, {
//         method: "GET",
//         headers: {
//             'content-type': 'application/json',
//             Authorization: "Bearer " + tokenService.getToken()
//         }
//     }, {mode: "cors"})
//     .then(res => res.json())
// }

export function deleteFlights(itinID, flightsData) {
    if (!flightsData.length) throw new Error('No flights selected');
    return fetch(BASE_URL + itinID, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + tokenService.getToken(), 'content-type': 'application/json'},
        body: JSON.stringify({flights: flightsData})
    }, {mode: "cors"})
    .then(res => res.json())
}
