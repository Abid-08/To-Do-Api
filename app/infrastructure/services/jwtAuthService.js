const jwt = require('jsonwebtoken')
const userRepository = require('../repositories/userRepository')


class JWTAuthService {
    static async generateToken(req) {
        return jwt.sign({ userId: req.body.email, }, process.env.SECRET);  //signing token
    }
    static async verifyToken(req) {
        const token = (req.headers.authorization).split(' ')[1]
        const decode = jwt.verify(token, process.env.SECRET);
        return decode;
    }
    static async checkToken(req) {
        const token = (await req.headers.authorization).split(' ')[1]
        return (await userRepository.FindByToken(token) ? 1 : 0)
    }
}

module.exports = JWTAuthService