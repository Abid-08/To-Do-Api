//const jwt = require('jsonwebtoken')
const userModel = require('../../../infrastructure/models/userModel')
const UserRepository = require('../../../infrastructure/repositories/userRepository')
const TodoRepository = require('../../../infrastructure/repositories/todoRepository')
//const googleAuth = require('../../../infrastructure/services/googleService') 
const JWTAuthService = require('../../../infrastructure/services/jwtAuthService')
const HashPassword = require('../../../infrastructure/services/hashPassword')
const userRepository = require('../../../infrastructure/repositories/userRepository')


class UserService {
    async signUp(req) {
        try {
            //sign token
            const token = await JWTAuthService.generateToken(req)
            const email = req.body.email
            const FirstName = req.body.FirstName
            const LastName = req.body.LastName
            const image = req.body.image
            if (!email.includes("@") || !email.endsWith(".com") || email.length <= 6) {
                return ("wrong email")
            }
            const password = await HashPassword.generatePassword(req)
            const user = new userModel({ email: email, FirstName: FirstName, LastName: LastName, password: password, token: token, userImage: image })
            const newUser = await UserRepository.Save(user)
            return newUser
        }
        catch (err) {
            return err
        }

    }
    async signInGoogle(req) {
        try { }
        catch (err) {
            return err
        }
    }

    async signUpGoogle(req) {
        try { }
        catch (err) {
            return err
        }
    }

    async signIn(req) {
        try {
            const user = await UserRepository.FindByEmail(req.body.email)
            if (user) {

                if (HashPassword.verify(req, user)) {
                    console.log(user)
                    return ([user.token,user._id, 200])
                } else return ["wrong Password", 401]
            } else return ["user not found", 404]
        }
        catch (err) {
            return err
        }
    }
    async getOne () {
        try {
            const user = await userRepository.FindByToken(req.headers.authorization)
            if (user) {
                return { email: user.email, id: user._id, FirstName: user.FirstName, LastName: user.LastName }
            }
            return ("Does not exist")
        }
        catch (err) {
            return err
        }
    }
    async getUsers() {
        try {
            const user = await UserRepository.Find()
            let resp = []
            for (let x of user) {
                resp.push({ email: x.email, id: x._id, FirstName: x.FirstName, LastName: x.LastName })
            }
            return resp
        }
        catch (err) {
            return err
        }
    }
    async getUser(req) {
        try {
            const { id } = req.params
            const user = await UserRepository.FindById(id)
            if (user) {
                return { email: user.email, id: user._id, FirstName: user.FirstName, LastName: user.LastName }
            }
            return ("Does not exist")
        }
        catch (err) {
            return err
        }
    }
    async updateUser(req) {
        try {
            const { id } = req.params
            const user = await UserRepository.FindById(id)
            if (!req.body.email.includes("@") || !req.body.email.endsWith(".com") || req.body.email.length <= 6) {
                return "wrong email"
            } else {


                user.email = req.body.email
                user.FirstName = req.body.FirstName
                user.LastName = req.body.LastName
                user.userImage = user.userImage
                
                user.token = user.token
                return await UserRepository.Save(user)
            }
        }
        catch (err) {
            return err
        }
    }

    async updatePassword(req) {
        try {
            const email = req.body.email
            const user = await userRepository.FindByEmail(email)

            if (user) {
                user.email = req.body.email
                user.FirstName = user.FirstName
                user.LastName = user.LastName
                user.userImage=user.userImage
                user.password=await HashPassword.generatePassword(req)
                user.token = user.token
                return await UserRepository.Save(user)
            }
        }
        catch (e){
            return e
        }
    }
    async updatePhoto (req) {
        try {
            const { id } = req.params
            const user = await UserRepository.FindById(id)

            user = {...user, userImage: req.body.image}

            return await UserRepository.Save(user)
        }
        catch (e) {
            return e
        }
    }

    async deleteUser(req) {
        try {
            const { id } = req.params
            const user = await UserRepository.FindById(id)
            console.log(user.Todos)
            for (let x of user.Todos) {
                await TodoRepository.Delete(await TodoRepository.FindById(x))
            }
            return await UserRepository.Delete(user)
        }
        catch (err) {
            return err
        }
    }
}


module.exports = new UserService