const express = require('express');
const router = express.Router();
const hotelsCtrl = require('../controllers/hotels');

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(require("../config/auth"));
router.get('/', checkAuth, hotelsCtrl.index);
router.get('/:id', checkAuth, hotelsCtrl.show);
router.post('/', checkAuth, hotelsCtrl.create);
router.put('/:id', checkAuth, hotelsCtrl.update);
router.delete('/:id', checkAuth, hotelsCtrl.delete);


function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;