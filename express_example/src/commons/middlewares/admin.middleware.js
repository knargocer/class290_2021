const asyncHandler = require('express-async-handler');
const { Unauthorized } = require('http-errors');
const { ROLES } = require('../util');

const validateAdmin = asyncHandler(async (req, res, next) => {

    if (req.user.role !== ROLES.ADMIN) {
        throw new Unauthorized();
    }
    return next();
});

module.exports = validateAdmin;