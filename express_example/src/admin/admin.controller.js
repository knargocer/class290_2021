const express = require('express');
const router = express.Router();
const admin = require('./admin.service');
const asyncHandler = require('express-async-handler');
const validateAdmin = require('../commons/middlewares/admin.middleware')


router.use(validateAdmin);

router.patch('/unlock-user/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const result = await admin.validateAndUnlock(id);
   
    res.status(200).json(result);
}))
router.patch('/lock-user/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const result = await admin.validateAndLock(id);
   
    res.status(200).json(result);
}))

module.exports = router;