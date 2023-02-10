import { decodeSymmetric, getAlgorithm } from 'atlassian-jwt';

/**
 * Decoding the JWT token passed from Jira
 */
export const decodeJwtToken = (encodedToken: string, sharedSecret: string) => {
    return decodeSymmetric(encodedToken, sharedSecret, getAlgorithm(encodedToken));
};