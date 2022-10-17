const express = require ('express')
const isLoggedIn = require('../middleware/userTokenAuthentication')
const router = express.Router()
const controller = require('../controllers/index')


router.post('/todos',isLoggedIn, controller.todoControls.createTodo) //create
router.get('/todos',isLoggedIn, controller.todoControls.getTodos) //read
router.get('/todos/:id',isLoggedIn, controller.todoControls.getTodo) //read single
router.put('/todos/:id',isLoggedIn,controller.todoControls.updateTodo) //update 
router.delete('/todos/:id',isLoggedIn,controller.todoControls.removeTodo) //remove
router.put('/completed/:id',isLoggedIn,controller.todoControls.updateCompleted)
module.exports = router;