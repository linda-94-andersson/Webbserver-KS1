
const http = require("http");
const fs = require("fs/promises");
const crypto = require("crypto");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 5000;

const jsonPath = "data.json";

async function readJson() {
    try {
        const json = await fs.readFile(jsonPath);
        return JSON.parse(json);
    } catch (error) {
        console.error(error, " could not read json-file");
        return null;
    }
}

async function writeJson(data) {
    try {
        const json = JSON.stringify(data);
        await fs.writeFile(jsonPath, json);
    } catch (error) {
        console.error(error, " could not write to file");
    }
}

function sendJson(res, data, code = 200) {
    res.writeHead(code, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}

function sendError(res, message, code = 404) {
    sendJson(res, { message }, code);
}

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

    const [route, id] = req.url.split("/").filter((urls) => urls.length > 0);
    if (route !== "todos") {
        return sendError(res, "Route not found");
    }

    const todos = await readJson();
    if (!todos) {
        res.statusCode = 500;
        res.end();
        return;
    }

    if (req.method === "GET") {
        if (!id) {
            return sendJson(res, todos);
        }

        const todo = todos.find((todo) => todo.id === id);
        if (!todo) {
            return sendError(res, `Todo with id ${id} not found`);
        }

        return sendJson(res, todo);
    }

    if (req.method === "DELETE") {
        if (!id) {
            return sendError(res, `Could not delete`, 400);
        }

        const index = todos.findIndex((todo) => todo.id === id);
        if (index < 0) {
            return sendError(res, `Todo with id ${id} not found`);
        }

        const [deleted] = todos.splice(index, 1);
        await writeJson(todos);
        return sendJson(res, deleted);
    }

    if (req.method === "POST") {
        const body = await getReqData(req);
        if (!body) {
            return sendError(res, "Empty request", 400);
        }
        const data = JSON.parse(body);
        const todo = { id: crypto.randomBytes(6).toString("hex"), name: data.name, completed: false };
        todos.push(todo);
        await writeJson(todos);

        return sendJson(res, todo, 201);
    }

    if (req.method === "PATCH") {
        if (!id) {
            return sendError(res, `Could not patch`, 400);
        }
        const index = todos.findIndex((todo) => todo.id === id);
        if (index < 0) {
            return sendError(res, `Todo with id ${id} not found`);
        }
        const body = await getReqData(req);
        if (!body) {
            return sendError(res, "Empty request", 400);
        }
        const data = JSON.parse(body);
        todos[index] = {
            id: todos[index].id,
            name: data.name || todos[index].name,
            completed: typeof data.completed === "boolean" ? data.completed : todos[index].completed
        };

        await writeJson(todos);

        return sendJson(res, todos[index]);
    }

    if (req.method === "PUT") {
        if (!id) {
            return sendError(res, `Could not put`, 400);
        }
        const index = todos.findIndex((todo) => todo.id === id);
        if (index < 0) {
            return sendError(res, `Todo with id ${id} not found`);
        }
        const body = await getReqData(req);
        if (!body) {
            return sendError(res, "Empty request", 400);
        }
        const data = JSON.parse(body);
        todos[index] = {
            ...data,
            id: todos[index].id
        };

        await writeJson(todos);

        return sendJson(res, todos[index]);
    }

    sendError(res, `${req.method} not allowed`, 400);
});

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});