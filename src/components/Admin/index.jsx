import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { AiOutlineClear } from "react-icons/ai";
import axios from "axios";
const Main = () => {
	let navigate =useNavigate()
	const [error, setError] = useState("");
	const [response,setresponse] = useState([]);
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("email");
		navigate("/login")
	};
	const clear = async (e) => {
		e.preventDefault();
		try {
			const data=null
			const url = "http://localhost:8080/api/remove";
			const { data: res } = await axios.post(url, data);
			window.location.reload();
			
			
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};
	useEffect(async()=>{
		try {
            const data ={"data":null}
			const url = "http://localhost:8080/api/admin";
			const { data: res } =await axios.post(url, data);
			console.log(res.data);
			
			setresponse(res.data)

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
				<h3>Welcome Yoda Youhou</h3>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
            <div>
                <table className={styles.rwd_table}>
				<tbody>
         <tr>
           <th>First Name</th>
           <th>Last Name</th>
           <th>Email ID</th>
		   <th>Date</th>
         </tr>  
       
         {
         response.map( (items,key) =>
         <tr key={key}>
             <td data-th="Firstname">{items.firstName }</td>
             <td data-th="Lastname">{items.lastName }</td>
             <td data-th="Email">{items.email }</td>
			 <td data-th="Date">{Date(items.date) }</td>
         </tr>
         )
       }
       </tbody>
     </table>

	 <button className={styles.blue_btn} onClick={clear}>
					<span>Clear records</span><AiOutlineClear className={styles.icon} size={'20'}/>
				</button> 
            </div>
		</div>
		
	);
};

export default Main;
