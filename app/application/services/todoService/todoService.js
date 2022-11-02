const TodoRepository = require('../../../infrastructure/repositories/todoRepository')
const UserRepository = require('../../../infrastructure/repositories/userRepository')
const TodoModel = require('../../../infrastructure/models/todoModel')
const userModel = require('../../../infrastructure/models/userModel')

class TodoService {
    async create(req) {
        try {
            const text = req.body.text
            const description = req.body.description
            const date = new Date()
            const dateCreated= `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}/${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            const user = await UserRepository.FindByToken(req.headers.authorization.split(' ')[1])
            const todo = new TodoModel({ text: text, description: description , completed: false, userId: user._id, dateCreated: dateCreated })
            const newTodo = await TodoRepository.Save(todo)
            user.Todos.push(newTodo._id)
            await UserRepository.Save(user)
            return newTodo
        }
        catch (err) {
            return err
        }
    }
    async getAll(req) {
        try {
            const user = await UserRepository.FindByToken(req.headers.authorization.split(' ')[1])
            const todos = await TodoRepository.FindAll(user._id)
            return todos
        }
        catch (err) {
            return err
        }
    }
    async get(req) {
        try {
            const { id } = req.params
            const todo = await TodoRepository.FindById(id)
            return todo
        }
        catch (err) {
            return err
        }
    }
    async update(req) {

        try {
            const { id } = req.params
            const todo = await TodoRepository.FindById(id)
            if (req.body.completed) todo.completed = req.body.completed
            else todo.completed = todo.completed
            todo.text = req.body.text
            todo.description = req.body.description
            return TodoRepository.Save(todo)
        }
        catch (err) {
            return err
        }
    }
    async updateCompleted(req) {
        try {
            const {id} = req.params
            const todo = await TodoRepository.FindById(id)
          
            todo.completed=req.body.completed   
                return await TodoRepository.Save(todo)
            
        }
        catch (err) {
            return err
        }
    }
    async deleteTodo(req) {
        try {
            const { id } = req.params
            const user = await UserRepository.FindByToken(req.headers.authorization.split(' ')[1])
            const todo = (await TodoRepository.FindById(id))
            await TodoRepository.Delete(todo)
            user.Todos.splice(user.Todos.indexOf(id), 1)
            await UserRepository.Save(user)
            return "deleted"
        }
        catch (err) {
            return err
        }
    }
}

module.exports = new TodoService;