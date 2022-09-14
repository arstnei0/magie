import { IncomingMessage, ServerResponse } from 'http';

declare function createStaticServer(config: any): (req: IncomingMessage, res: ServerResponse) => void;

export { createStaticServer as default };
