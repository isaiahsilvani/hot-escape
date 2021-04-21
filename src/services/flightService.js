import tokenService from "./tokenService"
const BASE_URL = '/api/flights/'

export function searchPlace(query) {
    return fetch(BASE_URL + 'place/' + query, {
        method: "GET",
        headers: { Authorization: "Bearer " + tokenService.getToken(), 'content-type': 'application/json'},
    }, {mode: "cors"})
    .then(res => res.json())
}

export function searchFlights(flightsData) {
    return fetch(BASE_URL + 'search', {
        method: "POST",
        headers: { Authorization: "Bearer " + tokenService.getToken(), 'content-type': 'application/json'},
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

export function deleteFlights(itinID, flightsData) {
    if (!flightsData.length) throw new Error('No flights selected');
    return fetch(BASE_URL + itinID, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + tokenService.getToken(), 'content-type': 'application/json'},
        body: JSON.stringify({flights: flightsData})
    }, {mode: "cors"})
    .then(res => res.json())
}
