const User = require('../models/userModel')

class UserRepository {
    async Save(user) {
        return (await user.save())
    }
    async Find() {
        return (await User.find())
    }
    async FindByEmail(email) {
        return (User.findOne({ email: email }))
    }
    async FindByToken(token) {
        return (User.findOne({ token: token }))
    }
    async FindById(id) {
        return await User.findById(id);
    }
    async Delete(user) {
        return await user.remove();
    }
}

module.exports = new UserRepository