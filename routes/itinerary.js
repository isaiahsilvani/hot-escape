const express = require('express');
const router = express.Router();
const itineraryControl = require('../controllers/itinerary');

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(require("../config/auth"));
router.get("/:uid", checkAuth, itineraryControl.index)
router.get("/show/:id", checkAuth, itineraryControl.show)
router.post("/", checkAuth, itineraryControl.create)
router.put("/:id", checkAuth, itineraryControl.update)
router.delete("/:id", checkAuth, itineraryControl.delete)

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;