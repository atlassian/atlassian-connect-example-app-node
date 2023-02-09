import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const envFileName = '.env';
const envFilePath = path.resolve(__dirname, envFileName);

const createEnvFile = async () => {
    if (!fs.existsSync(envFilePath)) {
        return new Promise<void>((resolve, reject) => {
            exec('./.husky/create-env.sh', (error, stdout) => {
                if (error) {
                    reject(error);
                    return;
                }
                console.info(stdout);
                resolve();
            });
        });
    }
};

const callTunnel = async () => {
    const response = await fetch('http://tunnel:4040/api/tunnels');

    if (!response.ok) {
        throw new Error(`ngrok tunnel error: ${response}`);
    }

    return response.json();
};

const waitForTunnel = async () => {
    // Call the service 3 times until ready
    const response = await callTunnel()
        .catch(callTunnel)
        .catch(callTunnel)
        .catch(() => undefined);
    if (response) {
        try {
            let envContents = fs.readFileSync(envFilePath, { encoding: 'utf-8' });
            const tunnel = response.tunnels.find(tunnel => tunnel.public_url.startsWith('https'));
            const ngrokDomain = tunnel.public_url;
            console.info(`ngrok forwarding ${ngrokDomain} to ${tunnel.config.addr}`);
            envContents = envContents.replace(/APP_URL=.*/, `APP_URL=${ngrokDomain}`);
            fs.writeFileSync(envFilePath, envContents);
            console.info(`Updated ${envFileName} file to use ngrok domain '${ngrokDomain}'.`);
        } catch (e) {
            console.info(`'${envFilePath}' not found, skipping...`, e);
        }
    } else {
        console.info(`Ngrok not running, skipping updating ${envFileName} file.`);
    }
};

// Check to see if ngrok is up and running
(async function main() {
    try {
        await createEnvFile();
        await waitForTunnel();
        process.exit();
    } catch (e) {
        process.exit(1);
    }
})();
