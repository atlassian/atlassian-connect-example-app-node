import { setGlobalTheme } from "@atlaskit/tokens";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartConnection from "./pages/StartConnection";
import { startConnectionData } from "./pagesData/startConnectionData";
import { connectedData } from "./pagesData/connectedData";
import Connected from "./pages/Connected";

const App = () => {
	setGlobalTheme({
		light: "light",
		dark: "dark",
		colorMode: "auto",
		spacing: "spacing",
		typography: "typography-adg3",
	});

	// The path "/spa" is mapped to the StartConnection component page.
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/spa">
					<Route index element={<StartConnection {...startConnectionData} />} />
					<Route path="connected" element={<Connected {...connectedData} />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
