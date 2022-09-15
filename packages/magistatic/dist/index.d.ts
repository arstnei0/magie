import { IncomingMessage, ServerResponse } from 'http';

interface Config {
    root?: string;
    cwd?: string;
    autoIndex?: boolean;
    errHandler?: (IncomingMessage: any, ServerResponse: any) => any | Promise<any>;
    gzip?: string[] | boolean;
    cache?: number;
}
declare function createStaticServer(config: Config): (req: IncomingMessage, res: ServerResponse) => void;

export { Config, createStaticServer as default };
