const express = require('express');
const router = express.Router();
const chatCtrl = require('../controllers/chats')

// Public Routes

// Protected Routes
console.log('router hit')
router.use(require("../config/auth"));
router.post('/', checkAuth, chatCtrl.createRoom)
router.post('/messages', checkAuth, chatCtrl.storeMessage)
router.get('/:room', checkAuth, chatCtrl.index);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }
  
  module.exports = router;