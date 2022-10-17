const bcrypt = require('bcrypt')

class HashPassword {
    static async generatePassword(req) {
        const salt = await bcrypt.genSalt(10) // generate salt to hash password
        return await bcrypt.hash(req.body.password, salt) //generating hashed password
    }
    static async verify(req, user) {
        return await bcrypt.compare(user.password, req.body.password)
    }
}

module.exports = HashPassword