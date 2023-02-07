import { decodeSymmetric, getAlgorithm } from 'atlassian-jwt';

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
    const tunnel = data.tunnels.filter(tunnel => tunnel.proto === "https");

    return tunnel[0].public_url;
}


/**
 * Decoding the JWT token passed from Jira
 */
export const decodeJwtToken = (encodedToken: string, sharedSecret: string) => {
    return decodeSymmetric(encodedToken, sharedSecret, getAlgorithm(encodedToken));
};