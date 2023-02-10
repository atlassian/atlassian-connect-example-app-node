import { config } from 'dotenv';
import path from 'path';

export type EnvVars = {
    APP_URL: string;
    NGROK_AUTHTOKEN: string;
};

config({ path: path.resolve(__dirname, '../..', '.env') });

export const envVars: EnvVars = new Proxy<object>({}, {
    get(_target: object, prop: keyof EnvVars) {
        // get from process.env directly since the whole env object might be replaced
        return process.env[prop];
    }
}) as EnvVars;
