const express = require('express');
const router = express.Router();
const attractionsCtrl = require('../controllers/attractions');

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(require("../config/auth"));
router.get('/', checkAuth, attractionsCtrl.index);
router.get('/:id', checkAuth, attractionsCtrl.show);
router.post('/', checkAuth, attractionsCtrl.create);
router.put('/:id', checkAuth, attractionsCtrl.update);
router.delete('/:itinid/:id', checkAuth, attractionsCtrl.delete);

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;