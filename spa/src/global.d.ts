//Need this line to make it a "module" file
//https://stackoverflow.com/a/42257742
export {};

declare global {
	const AP: AtlassianPlugin;
}

interface AtlassianPlugin {
	getLocation: (...args) => void;
	context: {
		getToken: (...args) => void;
	}
	navigator: {
		go: (...args) => void;
		reload: () => void;
	}
}

