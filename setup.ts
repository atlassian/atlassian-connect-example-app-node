import fs from 'fs';
import path from 'path';

const envFileName = '.env';
const envExampleFileName = '.env.example';
const envFilePath = path.resolve(__dirname, envFileName);
const envExampleFilePath = path.resolve(__dirname, envExampleFileName);

// Creates the .env file
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

(async function main() {
    try {
        await createEnvFile();
        process.exit();
    } catch (e) {
        process.exit(1);
    }
})();
