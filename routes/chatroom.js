const express = require('express');
const router = express.Router();
const chatCtrl = require('../controllers/chats')

// Public Routes

// Protected Routes
router.use(require("../config/auth"));
console.log('router hit')
router.get('/', (req, res) => {
  console.log('chatroom router active')
});

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }
  
  module.exports = router;