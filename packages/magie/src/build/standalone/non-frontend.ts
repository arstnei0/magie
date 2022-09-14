import { createServer } from "http";
// @ts-expect-error: This is a virtual module
// eslint-disable-next-line import/no-unresolved
import handler from "/virtual:magie-connect-handler";

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || "localhost";

createServer((req, res) => {
	handler(req, res);
}).listen(PORT, HOST, () => {
	// eslint-disable-next-line no-console
	console.log(`Server listening on http://${HOST}:${PORT}`);
});
