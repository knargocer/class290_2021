const express = require('express');
const router = express.Router();
const admin = require('./admin.service');
const users = require('../users/users.service');
const asyncHandler = require('express-async-handler');
const { Unauthorized } = require('http-errors');

router.patch('/unlock-user/:id', asyncHandler(async (req, res) => {
    
    // if(req.user.role === 'customer'){return new Unauthorized()}
    const {id} = req.params;
    const result = await admin.validateAndUnlock(id);
   
    res.status(200).json(result);
}))
router.patch('/lock-user/:id', asyncHandler(async (req, res) => {
    
    // if(req.user.role === 'customer'){return new Unauthorized()}
    const {id} = req.params;
    const result = await admin.validateAndLock(id);
   
    res.status(200).json(result);
}))

module.exports = router;