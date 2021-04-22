const express = require('express');
const router = express.Router();
const rentalsCtrl = require('../controllers/rentals');

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(require("../config/auth"));
router.post('/', checkAuth, rentalsCtrl.create);
router.put('/:id', checkAuth, rentalsCtrl.update);
router.delete('/:itinid/:id', checkAuth, rentalsCtrl.delete);


function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;