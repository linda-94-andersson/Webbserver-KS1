const http = require("http");

const hostname = "127.0.0.1";

const port = process.env.PORT || 5000;

const server = http.createServer();

server.on("request", (request, res) => {
    res.end("Hello World!");
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
