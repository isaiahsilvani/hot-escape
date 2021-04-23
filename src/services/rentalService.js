import tokenService from "./tokenService"
const BASE_URL = '/api/rentals/'

export function addRental(rentalData) {
    return fetch(BASE_URL, {
      headers: { 'content-type': 'application/json',
        Authorization: "Bearer " + tokenService.getToken() },
      method: 'POST',
      body: JSON.stringify(rentalData)
    },{mode: "cors" })
    .then(res => res.json())
  }

export function deleteOne(itinID, rentalID) {
    return fetch(`${BASE_URL}/${itinID}/${rentalID}`, {
      headers: { 'content-type': 'application/json',
        Authorization: "Bearer " + tokenService.getToken() },
      method: 'DELETE'
    },{mode: "cors"})
    .then(res => res.json());
  }

export function updateRental(rentalData) {
  return fetch(BASE_URL + rentalData.rentalId, {
    headers: { 'content-type': 'application/json',
      Authorization: "Bearer " + tokenService.getToken() },
    method: 'PUT',
    body: JSON.stringify(rentalData)
  },{mode: "cors" })
  .then(res => res.json())
}