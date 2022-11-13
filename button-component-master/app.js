const fs = require("fs");
const http = require("http")
const hostname = "127.0.0.1";
const port = 3000;

// CreateReadStream instead to save memory
const index = fs.readFileSync("index.html");
const java = fs.readFileSync("script.js");
const css = fs.readFileSync("style.css");

// Request handler
const server = http.createServer((req, res) => {
 if (req.url === "/") {
   res.setHeader("Content-Type", "text/html");
   res.write(index);
 }
 if (req.url === "/script.js") {
   res.setHeader("Content-Type", "text/javascript");
   res.write(java);
 }

 if (req.url === "/style.css") {
    res.setHeader("Content-Type", "text/css");
    res.write(css);
  }
 res.statusCode = 200;
 //   res.writeHead(200, java);
 res.end();
});

server.listen(port, hostname, () => {
 console.log(`Server running at http://${hostname}:${port}/`);
});