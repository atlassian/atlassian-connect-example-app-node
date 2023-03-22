import * as fs from 'fs';
import * as path from 'path';

const envFileName = '.env';
const envExampleFileName = `${envFileName}.example`;
const envFilePath = path.resolve(__dirname, envFileName);
const envExampleFilePath = path.resolve(__dirname, envExampleFileName);

/**
 * Creates the env file
 */
const createEnvFile = async () => {
    if (!fs.existsSync(envFilePath)) {
        await fs.copyFile(envExampleFilePath, envFilePath, (err) => {
            if (err) {
                console.error("Couldn't create .env file: ", err);
                throw new Error("Error creating .env file: ");
            }
            console.log('.env file created!');
        });
    }
};

/**
 * This script creates an env file if there isn't one,
 * The env file is based off from .env.example
 */
(async function main() {
    try {
        await createEnvFile();
        process.exit();
    } catch (e) {
        process.exit(1);
    }
})();
