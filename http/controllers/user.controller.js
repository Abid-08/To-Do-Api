const dotenv= require('dotenv')
const { json } = require('express');
const userService = require('../../app/application/services/userService/userService');
const UserService = require('../../app/application/services/userService/userService')
dotenv.config()

class UserController {

    static async SignUp(req, res) {
        res.json(await UserService.signUp(req)).status(201)
    }
    static async SignIn(req, res) {
        res.status((await UserService.signIn(req))[2]).json([(await UserService.signIn(req))[0],(await UserService.signIn(req))[1]])
    }
    static async getUsers(req, res) {
        res.json(await UserService.getUsers()).status(200)

    }
    static async getUser(req, res) {
        res.json(await UserService.getUser(req)).status(200)
    }
    static async updateUser(req, res) {
        res.json(await UserService.updateUser(req)).status(200)
    }
    static async removeUser(req, res) {
        res.json(await UserService.deleteUser(req)).status(204)
    }
    static async getOne(req,res) {
        res.json(await UserService.getOne(req))
    }

    static async updatePassword(req,res) {
        res.json(await userService.updatePassword(req))
    }

    static async updatePhoto(req,res) {
        res.json(await userService.updatePhoto(req))
    }
    
}




module.exports = UserController