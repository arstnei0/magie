import { writeFile } from "fs/promises";

export default async function writeOutput(content, path) {
    await writeFile(path, content);
}