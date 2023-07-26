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


let checkFileExist = (filepath) => {
    return new Promise((resolve, reject) => {
        fs.access(filepath, fs.F_OK, (err)=> {
            if(err) reject(err);
            resolve (filepath);
        });
    });
};

let readMyFile = (filepath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data ) => {
            if (err) reject (err);
            resolve(data);
        });
    });
};

let router = (req, res) => {
  let params = url.parse(req.url, true);
  let oriPath = params.pathname == "/" ? "/index.html" : params.pathname;
  let filepath = __dirname + oriPath;
 
  console.log (filepath);
  let ext = path.extname(oriPath);
  
  checkFileExist(filepath)
    .then(readMyFile)
    .then(data => {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(data);
    })
    .catch(err => {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("<h1>file not found</h1>")})

  
};

let server = http.createServer(router);

server.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

