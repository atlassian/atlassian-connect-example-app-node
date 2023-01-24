/**
 * This baseUrl is pulled from the ngrok tunnel API,
 * it changes everytime you run a new tunnel
 * This URL is needed in the connect-app-descriptor json
 */
const baseUrl = async (): Promise<string> => {
    const response = await fetch('http://tunnel:4040/api/tunnels');
    if (!response.ok) {
        throw new Error(`ngrok tunnel error: ${response}`);
    }
    const data = await response.json();
    return data.tunnels[0].public_url;
}

export default baseUrl;