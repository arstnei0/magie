import { createServer } from "http";
function handler(req, res, next) {
  next();
}
function createStaticServer(config) {
  return (req, res) => {
    console.log(req.path);
  };
}
const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || "localhost";
const staticServer = createStaticServer();
createServer((req, res) => {
  handler(req, res, () => {
    staticServer(req, res);
  });
}).listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
