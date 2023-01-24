/**
 * This baseUrl is pulled from the ngrok tunnel API,
 * it changes everytime you run a new tunnel
 * This URL is needed in the connect-app-descriptor json
 */
const baseUrl = async (): Promise<string> => fetch('http://tunnel:4040/api/tunnels')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`ngrok tunnel error: ${response}`);
        }

        return response.json();
    })
    .then((data) => {
        return data.tunnels[0].public_url;
    });

export default baseUrl;