
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
            console.log(response, " res");

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
                console.log(response, " res");

                res.end(JSON.stringify(response));
            })

        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error + " GET:id error" }));
        }
    }
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "DELETE") {
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
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error + " PUT error" }));
        }
    }
    else if (req.url === "/api/todos" && req.method === "POST") {
        let todo_data = await getReqData(req);
        let todo = await new Todo().createTodo(JSON.parse(todo_data));
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 201;
        res.end(JSON.stringify(todo));
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});


// Exemple kod
// const fs = require("fs");

// const customer = {
//   name: process.argv[2],
//   address: process.argv[3]
// }

// fs.readFile("./customers.json", (err, data) => {
//   if (err) throw err;

//   const parsedJson = JSON.parse(data);
//   parsedJson.customers.push(customer)

//   const stringifiedJson = JSON.stringify(parsedJson, null, 2);

//   fs.writeFile("./customers.json", stringifiedJson, (err) => {
//     if (err) throw err;
//     console.log("Wrote to customers.json");
//   })
// })