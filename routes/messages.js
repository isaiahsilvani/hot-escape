const express = require('express');
const router = express.Router();
const msgCtrl = require('../controllers/messages')

// Public Routes

// Protected Routes
console.log('router hit')
router.use(require("../config/auth"));
router.post('/', checkAuth, msgCtrl.storeMsg)

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }
  
  module.exports = router;