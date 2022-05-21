
function getReqData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";

            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            req.on("end", () => {
                if (!body) {
                    res.statusCode = 400;
                    res.end("The body of the request is invalid.");
                }
                resolve(body);
            });
        } catch (error) {
            reject(error + " getReqDatta error");
        }
    });
}
module.exports = { getReqData }