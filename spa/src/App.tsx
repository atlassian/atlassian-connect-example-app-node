import { setGlobalTheme } from "@atlaskit/tokens";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartConnection from "./pages/start-connection";
import { data } from "./pages/start-connection";

const App = () => {
	setGlobalTheme({
		light: "light",
		dark: "dark",
		colorMode: "auto",
		spacing: "spacing",
		typography: "typography-adg3",
	});

	// The path "/spa" maps to the StartConnection component
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/spa">
					<Route
						index
						element={
							<StartConnection
								appName="Your App"
								appLogoPath="/public/assets/jira-logo.svg"
								integrationRequirements={data}
							/>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
