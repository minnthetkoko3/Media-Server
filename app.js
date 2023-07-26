let http = require("http");
let url = require("url");
let fs = require("fs");
let qs = require("querystring");
require("dotenv").config();

let responder = (req, res, parm) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(parm);
};

let myFileReader = (filepath, res) => {
  fs.access(filepath, fs.F_OK, (err) => {
    if (err) {
        res.writeHead(404, {"Content-Type": "test/html"});
        res.end("<h1>file not found</h1>");
    }else {
    fs.readFile(filepath, (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "test/html" });
      res.end(data);
    });
}
  });
};

let routes = {
  GET: {
    "/": (req, res) => {
      let filepath = __dirname + "/index.html";
      myFileReader(filepath, res);
    },
    "/index.html": (req, res) => {
      let filepath = __dirname + "/index.html";
      myFileReader(filepath, res);
    },
    "/about.html": (req, res) => {
      let filepath = __dirname + "/about.html";
      myFileReader(filepath, res);
    },
    "/home": (req, res) => {
      responder(
        req,
        res,
        `<h1> Get Method => /home route params with  ${params.query.name} and ${params.query.age} </h1>`
      );
    },
  },
  POST: {
    "/": (req, res) => {
      responder(req, res, `<h1>Post Method  => / route</h1>`);
    },
    "/api/login": (req, res) => {
      let body = "";
      req.on("data", (data) => {
        body += data;
        if (body.length > 1024) {
          res.writeHead(403, { "Content-type": "text/html" });
          res.end("<h1> file size over 1 mb</h1>");
        }
      });
      req.on("end", () => {
        let query = qs.parse(body);
        console.log(body);
        console.log("Email", query.email, "Password", query.password);
        res.end();
      });
    },
  },
  NA: (req, res) => {
    responder(req, res, `<h1>NO Page For That Route!</h1>`);
  },
};

let start = (req, res) => {
  let reqMethod = req.method;

  let params = url.parse(req.url, true);
  // let name = params.query.name;
  // let age = params.query.age;
  //console.log("Name", name, "Age", age);

  let resolveRoute = routes[reqMethod][params.pathname];
  if (resolveRoute != null && resolveRoute != undefined) {
    resolveRoute(req, res);
  } else {
    routes["NA"](req, res);
  }
  //console.log(resolveRoute);
  //console.log(url_parms);
  // routes[reqMethod][url]();
};

let server = http.createServer(start);

server.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
