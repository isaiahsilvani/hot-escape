import tokenService from "./tokenService"
const BASE_URL = '/api/attractions/'

export function addAttraction(attractionData) {
    console.log("service data", attractionData)
    return fetch(BASE_URL, {
      headers: { 'content-type': 'application/json',
        Authorization: "Bearer " + tokenService.getToken() },
      method: 'POST',
      body: JSON.stringify(attractionData)
    },{mode: "cors" })
    .then(res => res.json())
}