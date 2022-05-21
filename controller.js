const data = require("./data");

class Controller {
    async getTodos() {
        return new Promise((resolve, _) => resolve(data));
    }

    async getTodo(id) {
        return new Promise((resolve, reject) => {
            let todo = data.find((todo) => todo.id === parseInt(id));
            if (todo) {
                resolve(todo);
            } else {
                reject(`Todo with id ${id} not found - getTodo`);
            }
        });
    }

    async createTodo(todo) {
        return new Promise((resolve, _) => {
            resolve(todo);
        });
    }

    async updateTodo(id) {
        return new Promise((resolve, reject) => {
            let todo = data.find((todo) => todo.id === parseInt(id));

            if (!todo) {
                reject(`No todo with id ${id} found - updateTodo`);
            }

            todo["completed"] = true;
            resolve(todo);
        });
    }

    async deleteTodo(id) {
        return new Promise((resolve, reject) => {
            let todo = data.find((todo) => todo.id === parseInt(id));

            if (!todo) {
                reject(`No todo with id ${id} found - deleteTodo`);
            }

            resolve(`Todo deleted successfully`);
        });
    }
}
module.exports = Controller;