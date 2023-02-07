import jwt_decode from 'jwt-decode';
import {decodeAsymmetric, getAlgorithm, getKeyId} from "atlassian-jwt";

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

export type DecodedJwtTokenType = {
    sub: string;
    qsh: string;
    iss: string;
    context: any;
    exp: number;
    iat: number;
};

export const decodeJwtToken = (encodedToken: string): DecodedJwtTokenType => {
    return jwt_decode(encodedToken);
};
export const decodeAtlassianJwtToken = async (token) => {
    console.log("Key Id", getKeyId(token), getAlgorithm(token));
    const publicKey = await queryAtlassianConnectPublicKey(getKeyId(token));
    console.log("publicKey", publicKey);
    return decodeAsymmetric(
        token,
        publicKey,
        getAlgorithm(token),
        false
    );
};

const queryAtlassianConnectPublicKey = async (keyId: string): Promise<string> => {
    const keyServerUrl = "https://connect-install-keys.atlassian.com";

    const response = await fetch(`${keyServerUrl}/${keyId}`);
    if (response.status !== 200) {
        throw new Error(`Unable to get public key for keyId ${keyId}`);
    }
    const result = await response.json();
    return result.data;
};
