const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(require("../config/auth"));
router.get('/place/:q', checkAuth, flightsCtrl.searchPlace)
router.post('/search', checkAuth, flightsCtrl.searchFlights)
router.post('/:itinid', checkAuth, flightsCtrl.addFlights)
router.delete('/:itinid', checkAuth, flightsCtrl.deleteFlights)

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;