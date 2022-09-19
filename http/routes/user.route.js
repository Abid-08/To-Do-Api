const express = require ('express')
const isLoggedIn = require('../middleware/userTokenAuthentication')
const router = express.Router()
const controller = require('../controllers/index')

router.post('/login', controller.userControls.SignIn) //login
router.post('/users', controller.userControls.SignUp) //create user
router.get('/users',isLoggedIn, controller.userControls.getUsers) //read
router.get('/users/:id',isLoggedIn, controller.userControls.getUser) //read single
router.put('/users/:id',isLoggedIn,controller.userControls.updateUser) //update 
router.delete('/users/:id',isLoggedIn,controller.userControls.removeUser) //remove

module.exports = router