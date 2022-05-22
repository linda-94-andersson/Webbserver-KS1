
const http = require("http");
const fs = require("fs");
const Todo = require("./controller");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, DELETE, OPTIONS, POST, PUT");

    if (req.method === "OPTIONS") {
        res.statusCode = 200;
        res.end();
        return;
    }

    if (req.url === "/api/todos" && req.method === "GET") {
        const todos = await new Todo().getTodos();
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(JSON.stringify(todos));

        fs.readFile("data.json", (err, data) => {
            if (err) throw error;

            const response = data.toString();
            console.log(response, " res todos");

            res.end(JSON.stringify(response));
        })
    }
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
        try {
            const id = req.url.split("/")[3];
            const todo = await new Todo().getTodo(id);
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(todo));

            fs.readFile("data.json", (err, data) => {
                if (err) throw error;

                const response = data.toString();
                res.end(JSON.stringify(response));

                console.log(todo, " res todo");
            })

        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error + " GET:id error" }));
        }
    }
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "DELETE") {
        // Setup med fs file, kan man deletea baserat på index/id? Kan man deletea alls utan unlink? 
        try {
            const id = req.url.split("/")[3];
            let message = await new Todo().deleteTodo(id);
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify({ message }));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error + " DELETE error" }));
        }
    }
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "PATCH") {
        try {
            const id = req.url.split("/")[3];
            let updated_todo = await new Todo().updateTodo(id);
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(updated_todo));

            fs.readFile("data.json", (err, data) => {
                if (err) throw error;

                const parsedJson = JSON.parse(data);
                parsedJson.push(updated_todo);

                const stringifiedJson = JSON.stringify(parsedJson, null, 2);

                fs.writeFile("data.json", stringifiedJson, (err) => {
                    if (err) throw err;

                    res.statusCode = 200;
                    res.end(JSON.stringify(updated_todo));
                    console.log(updated_todo, " Updated to data.json");
                })
            })
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error + " PATCH error" }));
        }
    }
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "PUT") {
        try {
            const id = req.url.split("/")[3];
            let updated_todo = await new Todo().updateTodo(id);
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(updated_todo));

            fs.readFile("data.json", (err, data) => {
                if (err) throw error;

                const parsedJson = JSON.parse(data);
                parsedJson.push(updated_todo);

                const stringifiedJson = JSON.stringify(parsedJson, null, 2);

                fs.writeFile("data.json", stringifiedJson, (err) => {
                    if (err) throw err;

                    res.statusCode = 200;
                    res.end(JSON.stringify(updated_todo));
                    console.log(updated_todo, " Updated to data.json");
                })
            })
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error + " PUT error" }));
        }
    }
    else if (req.url === "/api/todos" && req.method === "POST") {
        let todo_data = await getReqData(req);
        let todo = await new Todo().createTodo(JSON.parse(todo_data));

        res.setHeader("Content-Type", "application/json");

        fs.readFile("data.json", (err, data) => {
            if (err) throw error;

            // Skulle vilja att den ej postar om id redan finns 
            const parsedJson = JSON.parse(data);
            parsedJson.push({
                id: todo.id,
                name: todo.name,
                completed: todo.completed
            });

            const stringifiedJson = JSON.stringify(parsedJson, null, 2);

            fs.writeFile("data.json", stringifiedJson, (err) => {
                if (err) throw err;

                res.statusCode = 201;
                res.end(JSON.stringify(todo));
                console.log(todo_data, " Wrote to data.json");
            })
        })
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});