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