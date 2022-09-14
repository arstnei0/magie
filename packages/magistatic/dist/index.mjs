// src/index.ts
import { cwd as processCwd } from "process";
import { resolve as pathResolve } from "path";
import { createReadStream, statSync } from "fs";
import { getType } from "mime";
function defaultErrHandler(req, res) {
  res.writeHead(404, "404 Not Found!");
  res.end("404 Not Found!");
}
function createStaticServer(config) {
  const {
    root = "static",
    cwd = processCwd(),
    autoIndex = true,
    errHandler = defaultErrHandler
  } = config;
  let basePath;
  if (/dist\/?$/i.test(cwd)) {
    basePath = pathResolve(cwd, root);
  } else {
    basePath = pathResolve(cwd, "dist", root);
  }
  return (req, res) => {
    let pathUrl;
    if (autoIndex && req.url === "/") {
      pathUrl = "index.html";
    } else {
      pathUrl = `.${req.url}`;
    }
    checkPathExists: {
      let path = pathResolve(basePath, pathUrl);
      try {
        statSync(path);
      } catch (e) {
        break checkPathExists;
      }
      const tpyeOfFile = getType(pathUrl);
      res.writeHead(200, { "Content-Type": tpyeOfFile });
      const stream = createReadStream(path);
      stream.pipe(res);
      return;
    }
    errHandler(req, res);
  };
}
export {
  createStaticServer as default
};
