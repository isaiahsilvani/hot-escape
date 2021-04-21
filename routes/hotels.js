const express = require('express');
const router = express.Router();
const hotelsCtrl = require('../controllers/hotels');

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(require("../config/auth"));
router.post('/', checkAuth, hotelsCtrl.create);
router.put('/:id', checkAuth, hotelsCtrl.update);
router.delete('/:itinid/:id', checkAuth, hotelsCtrl.delete);

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;