const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');

/*---------- Public Routes ----------*/
router.post('/place', flightsCtrl.searchPlace)

/*---------- Protected Routes ----------*/
// router.use(require("../config/auth"));
// router.get('/', checkAuth, flightsCtrl.index);
// router.get('/:id', checkAuth, flightsCtrl.show);
// router.get("/search", checkAuth, flightsCtrl.searchFlight);
// router.post('/', checkAuth, flightsCtrl.create);
// router.delete('/:id', checkAuth, flightsCtrl.delete);

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;