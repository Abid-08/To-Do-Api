const jwt = require("jsonwebtoken")
const userRepository = require("../../app/infrastructure/repositories/userRepository")
const JWTAuthService = require('../../app/infrastructure/services/jwtAuthService')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res.status(401).send('header missing')
  } else {
    //jwt verification
    if (!JWTAuthService.verifyToken(req)) {
      res.status(403).send('invalid credentials')
    } else {
      const check = await JWTAuthService.checkToken(req)
      if (check) {
        next()
      }
      else {
        res.json('invalid token').status(403)
        //add path for redirction 
      }
    }
  }
}

