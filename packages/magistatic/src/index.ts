import { ServerResponse, IncomingMessage } from 'http';

export default function createStaticServer(config) {
    return (req: IncomingMessage, res: ServerResponse) => {
        console.log(req)
        res.end('aaa')
    }
}