import { IncomingMessage, ServerResponse } from 'http';

let messageList: any = [];

function err(req:IncomingMessage, res:ServerResponse) {
    res.writeHead(404, '404 Not Found!');
    res.end('404 Not Found!');
}

export default function handler(req: IncomingMessage, res: ServerResponse, next: any) {
    const match = req.url?.match(/^\/api\/(.+)\/?/i);
    if (match) {
        const query = match[1];

        if (query === 'message-list') {
            res.end(JSON.stringify(messageList));
        } else if (/^send$/i.test(query)) {
            req.on('data', (data) => {
                messageList.push(data.toString());
                res.end('Message send successfully!');
            });
        } else {
            err(req, res);
        }
    } else {
        next();
    }
}