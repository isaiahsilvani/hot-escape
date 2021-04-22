import tokenService from "./tokenService"
const BASE_URL = '/api/itinerary/'

export function addItinerary(itineraryData) {
  console.log("service data", itineraryData)
  return fetch(BASE_URL, {
    headers: { 'content-type': 'application/json',
      Authorization: "Bearer " + tokenService.getToken() },
    method: 'POST',
    body: JSON.stringify(itineraryData)
  },{mode: "cors" })
  .then(res => res.json())
}

export function getAll(userId) {
  return fetch(BASE_URL + userId, {
    headers: { Authorization: "Bearer " + tokenService.getToken() }
  })
  .then(res => res.json());
}

export function getOne(id) {
  console.log('getting itin', id)
  return fetch(BASE_URL + 'show/' + id, {
    headers: { Authorization: "Bearer " + tokenService.getToken() }
  })
  .then(res => res.json())
}

export function updateItinerary(itineraryData) {
  console.log("update data", itineraryData)
  return fetch(`${BASE_URL}${itineraryData.itinID}`, {
    headers: { 'content-type': 'application/json',
      Authorization: "Bearer " + tokenService.getToken() },
    method: 'PUT',
    body: JSON.stringify(itineraryData)
  },{mode: "cors" })
  .then(res => res.json())
}


export function deleteItinerary(itinID) {
  return fetch(`${BASE_URL}${itinID}`, {
    headers: { 'content-type': 'application/json',
      Authorization: "Bearer " + tokenService.getToken() },
    method: 'DELETE',
  },{mode: "cors" })
  .then(res => res.json())
}