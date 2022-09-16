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
        } else if (/^send\?m=(?:%27|%22)(.*)(?:%27|%22)/i.test(query)) {
            const message = query.match(/^send\?m=(?:%27|%22)(.*)(?:%27|%22)/i)?.[1] as string;
            messageList = [message, ...messageList];
            res.end('Send successfully');
        } else {
            err(req, res);
        }
    } else {
        next();
    }
}