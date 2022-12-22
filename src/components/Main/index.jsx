import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
const Main = () => {
	const [error, setError] = useState("");
	const [response,setresponse] = useState("");
	const [rev,setrev] = useState("");
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("email");
		window.location.reload();
	};
	useEffect(async()=>{
		try {
			var data ={"email":window.localStorage.getItem('email')}
			const url = "http://localhost:8080/api/fetch";
			const { data: res } =await axios.post(url, data);
			console.log(res.data)
			const rev = res.data.split('').reverse().join('')
			console.log(rev)
			setresponse(res)
			setrev(rev)

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	},[]);

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h3>Welcome {response.data}</h3>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div>
			Input:- {response.data}<br/>
			Reversed:- {rev}
		</div>
		</div>
		
	);
};

export default Main;
