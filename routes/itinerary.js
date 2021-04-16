const express = require('express');
const router = express.Router();
const itineraryControl = require('../controllers/itinerary');

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(require("../config/auth"));
router.get("/", checkAuth, itineraryControl.index)
router.get("/:id", checkAuth, itineraryControl.show)
router.post("/", checkAuth, itineraryControl.create)
router.put("/", checkAuth, itineraryControl.update)
router.delete("/:id", checkAuth, itineraryControl.delete)

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;