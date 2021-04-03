const User = require('../users/user.entity');
const { Unauthorized } = require('http-errors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    async validate(username, password) {
        const user = await User.findOne({ username });

        if (!user) {
            throw new Unauthorized('user not found');
        }
        if(user.isLocked){
            throw new Error('user is locked')
        }
        if(user.loginAttempts >3){
            await User.findOneAndUpdate({'username' : username}, {'isLocked' :true})
            throw new Error('maximum attempts was reached, your profile is locked')
        }
        if(!bcrypt.compareSync(password, user.password)){
           await User.findOneAndUpdate( {'username' : username}, {$inc:{ 'loginAttempts' : 1}})
           throw new Error('wrong password, attemp count:'+ user.loginAttempts)
        }
       
        return user;
    }
    
    async login(username, password) {
        const user = await this.validate(username, password);
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })

        return token;

    }

    validateToken(token) {
        const obj = jwt.verify(token, process.env.JWT_SECRET, {
            ignoreExpiration: false
        })

        return { userId: obj.userId, username: obj.username };
    }

}

module.exports = new AuthService();