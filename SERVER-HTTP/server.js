const http = require("http");
const fs = require("fs");

const PORT = 4000;

const app = http.createServer((req, res) => {
  let filePath = "";

  switch (req.url) {
    case "/":
      filePath = "src/index.html";
      break;
    case "/about":
      filePath = "src/about.html";
      break;
    case "/resources":
      filePath = "src/resources.html";
      break;
    default:
      filePath = "src/index.html"; 
  }

  fs.readFile(filePath, "utf-8", (err, content) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>Server Error</h1>");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    }
  });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
