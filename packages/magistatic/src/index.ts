import { ServerResponse, IncomingMessage } from 'http';
import { cwd as processCwd } from 'process';
import { resolve as pathResolve } from 'path';
import { createReadStream, statSync } from 'fs';
import { getType } from 'mime';
import { createGzip } from 'zlib';

export interface Config {
    root?: string;
    cwd?: string;
    autoIndex?: boolean;
    errHandler?: (IncomingMessage, ServerResponse) => any | Promise<any>;
    gzip?: string[] | boolean;
    cache?: number;
}

function defaultErrHandler (req: IncomingMessage, res: ServerResponse) {
    res.writeHead(404, '404 Not Found!');
    res.end('404 Not Found!');
}

export default function createStaticServer(config: Config) {
    const {
        root = 'static',
        cwd = processCwd(),
        autoIndex = true,
        errHandler = defaultErrHandler,
        gzip = true,
        cache = 3600,
    } = config;

    let basePath;

    if (/dist\/?$/i.test(cwd)) {
        basePath = pathResolve(cwd, root);
    } else {
        basePath = pathResolve(cwd, 'dist', root);
    }

    return (req: IncomingMessage, res: ServerResponse) => {
        let pathUrl;

        if (autoIndex && req.url === '/') {
            pathUrl = 'index.html';
        } else {
            pathUrl = `.${req.url}`;
        }
        checkPathExists : {
            let path = pathResolve(basePath, pathUrl);
            try {
                statSync(path);
            } catch (e) {
                break checkPathExists;
            }
            const tpyeOfFile = getType(pathUrl);

            let gzipNeed;
            if (gzip === true) {
                gzipNeed = true;
            } else gzipNeed = !!(gzip as string[]).find(e => e === tpyeOfFile);

            const headers = gzipNeed ? 
                { "Content-Encoding": 'gzip' } :
                {};

            if (cache) headers['Cache-Control'] = `max-age=${cache}`;
            res.writeHead(200, { 'Content-Type': tpyeOfFile, ...headers });
            
            const stream = createReadStream(path);
            if (gzipNeed) {
                let gzipStream = createGzip();
                stream.pipe(gzipStream);
                gzipStream.pipe(res);
            } else {
                stream.pipe(res);
            }
            return;
        }

        errHandler(req, res);
    }
}