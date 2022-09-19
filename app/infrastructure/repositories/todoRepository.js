const TodoModel = require('../models/todoModel')


class TodoRepository {
    async Save(todo) {
        return (await todo.save())
    }
    async FindById(id) {
        return (await TodoModel.findById(id))
    }
    async FindAll(userId) {
        return (await TodoModel.find({ userId: userId }))
    }
    async Delete(todo) {
        return (await todo.remove())
    }
}

module.exports = new TodoRepository;
