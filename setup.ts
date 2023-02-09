import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const envFileName = '.env';
const envFilePath = path.resolve(__dirname, envFileName);

// Creates the .env file
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

(async function main() {
    try {
        await createEnvFile();
        process.exit();
    } catch (e) {
        process.exit(1);
    }
})();
