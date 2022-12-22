import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Admin from "./components/Admin";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			{user && <Route path="/admin" exact element={<Admin />} />}
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;
