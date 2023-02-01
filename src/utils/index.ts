import fs from "fs";
import util from "util";
import path from "path";

const LOG_FILE = path.join(process.cwd(), "webhooks-log.txt");

/**
 * This baseUrl is pulled from the ngrok tunnel API,
 * it changes everytime you run a new tunnel
 * This URL is needed in the connect-app-descriptor json
 */
export const baseUrl = async (): Promise<string> => {
    const response = await fetch('http://tunnel:4040/api/tunnels');
    if (!response.ok) {
        throw new Error(`ngrok tunnel error: ${response}`);
    }
    const data = await response.json();
    return data.tunnels[0].public_url;
}

export const appendLogsToFile = (title, data) => {
    const logFile = fs.createWriteStream(LOG_FILE, {flags : 'a'});
    logFile.write(title + ' ---> ' + util.format(JSON.stringify(data)) + '\n');
}