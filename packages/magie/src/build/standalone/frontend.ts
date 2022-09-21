import { createServer } from "http";
// @ts-expect-error: This is a virtual module
// eslint-disable-next-line import/no-unresolved
import handler, { init } from "/virtual:magie-connect-handler";
import createStaticServer from 'magistatic';

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || "localhost";

init && init();

const staticServer = createStaticServer({

});

createServer((req, res) => {
	handler(req, res, () => {
		staticServer(req, res);
	});
}).listen(PORT, HOST, () => {
	// eslint-disable-next-line no-console
	console.log(`Server listening on http://${HOST}:${PORT}`);
});
