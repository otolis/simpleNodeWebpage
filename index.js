const http = require("http");
const fs = require("fs");
const url = require("url");

const page404 = fs.readFileSync("404.html", "utf-8"); // ✅ fixed

http
  .createServer(function (req, res) {
    const q = url.parse(req.url, true);
    let filename = "." + (q.pathname === "/" ? "/index.html" : q.pathname);

    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(page404);
        return res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
