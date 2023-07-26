require("dotenv").config();
let http = require("http");
let url = require("url");
let fs = require("fs");
let qs = require("querystring");
let path = require("path");

meme = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
};

let router = (req, res) => {
  let params = url.parse(req.url, true);
  let oriPath = params.pathname == "/" ? "/index.html" : params.pathname;
  let pathname = __dirname + oriPath;

  let ext = path.extname(oriPath);
  fs.access(pathname, fs.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>page not found</h1>");
    } else {
      fs.readFile(pathname, (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("<h1>page not found</h1>");
        } else {
          res.writeHead(200, { "Content-Type": meme[ext] });
          res.end(data);
        }
      });
    }
  });
};

let server = http.createServer(router);

server.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
