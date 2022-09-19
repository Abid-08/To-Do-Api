const dotenv= require('dotenv')
const { json } = require('express');
const UserService = require('../../app/application/services/userService/userService')
dotenv.config()

class UserController {

    static async SignUp(req, res) {
        res.json(await UserService.signUp(req)).status(201)
    }
    static async SignIn(req, res) {
        res.status((await UserService.signIn(req))[1]).json((await UserService.signIn(req))[0]).status(200)
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
        res.status(204).json(UserService.deleteUser(req)).status(204)
    }
}




module.exports = UserController