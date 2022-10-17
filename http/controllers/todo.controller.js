const TodoService = require('../../app/application/services/todoService/todoService')

class TodoController {
    static async createTodo(req, res) {
        res.json(await TodoService.create(req)).status(201)
    }

    static async getTodos(req, res) {
        res.json(await TodoService.getAll(req)).status(200)
    }

    static async getTodo(req, res) {
        res.json(await TodoService.get(req)).status(200)
    }

    static async updateTodo(req, res) {
        res.json(await TodoService.update(req)).status(200)
    }

    static async removeTodo(req, res) {
       res.json(await TodoService.deleteTodo(req)).status(204)
    }
    static async updateCompleted (req,res) {
        res.json(TodoService.updateCompleted(req))
    }
}

module.exports = TodoController;