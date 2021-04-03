const User = require('../users/user.entity');
const users = require('../users/users.service');
const { Unauthorized } = require('http-errors')
const util = require('../commons/util');

const admin = util.ADMIN_ROLE;
const customer = util.CUSTOMER_ROLE;

class AdminService{

    async validateAndUnlock(id) {
        const user = await users.findOne(id);
        if(!user){
            throw new Error('user not found');
        }
        if(!user.isLocked){
            throw new Error('The user should be locked to be unlocked!')
        }
        await User.findOneAndUpdate( {'username' : user.username}, {'isLocked' :false})

        return  { message: "User has successfully been unlocked!"}
    }

    async validateAndLock(id) {
        const user = await users.findOne(id);
        if(!user){
            throw new Error('user not found');
        }
        if(user.isLocked){
            throw new Error('The user is already locked!')
        }
        await User.findOneAndUpdate( {'username' : user.username}, {'isLocked' : true})

        return  { message: "User has successfully been unlocked!"}
    }
}
module.exports = new AdminService();