// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { setGlobalTheme } from "@atlaskit/tokens";
import {
	BrowserRouter,
	Route,
  Routes,
} from "react-router-dom";
import StartConnection from "./pages/start-connection";

const App = () => {

	setGlobalTheme({
		light: "light",
		dark: "dark",
		colorMode: "auto",
		spacing: "spacing",
		//typography: "typography",
	});

	return (
		<BrowserRouter>
				<Routes>
          <Route path="/spa">
            <Route index element={<StartConnection/>}/>
          </Route>
        </Routes>
		</BrowserRouter>
	);
};

export default App;