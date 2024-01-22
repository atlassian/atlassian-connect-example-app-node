import { setGlobalTheme } from "@atlaskit/tokens";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartConnection from "./pages/StartConnection";
import { data } from "./pages/StartConnection";

const App = () => {
	setGlobalTheme({
		light: "light",
		dark: "dark",
		colorMode: "auto",
		spacing: "spacing",
		typography: "typography-adg3",
	});

	// The path "/spa" is mapped to the StartConnection component page.
	// Replace 'appLogoPath' with the path to your application's logo.
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
