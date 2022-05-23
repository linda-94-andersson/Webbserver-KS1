
function getReqData(req) {
    return new Promise((resolve) => {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            resolve(body || null);
        });
    });
}
module.exports = { getReqData }