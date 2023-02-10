import fs from 'fs';
import path from 'path';

const envFileName = '.env';
const envFilePath = path.resolve(__dirname, envFileName);

const callTunnel = async () => {
    const results = await Promise.all([
        await fetch('http://tunnel:4040/api/tunnels'),
        await fetch('http://localhost:4040/api/tunnels')
    ]);

    const response = results.find((value) => value.ok) as Response;

    return response ? response.json() : Promise.reject();
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

(async function main() {
    try {
        await waitForTunnel();
        process.exit();
    } catch (e) {
        process.exit(1);
    }
})();
