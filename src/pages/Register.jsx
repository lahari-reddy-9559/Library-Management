import {Link ,useNavigate } from 'react-router-dom'
import login from '../images/back/register.png';
import { useState } from 'react';
import axios from 'axios';
export default function app(){
    const [details,setDetails]=useState({
        fullName:'',
        email:'',
        password:'',
        cpassword:'',
});
const [message, setMessage] = useState({ text: '', color: '' });
    const handleChange = (e) => {
        const { id, value } = e.target;
        setDetails((prev) => {
            const nextState = { ...prev, [id]: value };
            if (id === 'cpassword' || id==='password') {
                if (!nextState.cpassword) {
                    setMessage({ text: '', color: '' });
                } else if (nextState.password !== nextState.cpassword) {
                    setMessage({ text: "Passwords should match", color: "red" });
                } else {
                    setMessage({ text: "Passwords matched", color: "green" });
                }
            }
            return nextState;
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { fullName, email, password, cpassword } = details;
        if (email.length < 9) {
            setMessage({ text: "Email must be a valid email", color: "red" });
            return;
        }
        if(password.length<6){
            setMessage({ text: "Passwords must be greater than 6", color: "red" });
            return;
        }
        if (password !== cpassword) {
            setMessage({ text: "Passwords should match", color: "red" });
            return;
        }
        const checkbox = document.getElementById('check');
        if (!checkbox || !checkbox.checked) {
            alert('Please accept the Terms of Service and Privacy Policy to register.');
            return;
        }
        const userData = { fullName, email, password };
        try {
            const response = await axios.post(
                "https://library-api.vercel.app/api/register",
                userData
            );
            alert(response.data.message);
            setDetails({ fullName: '', email: '', password: '', cpassword: '' });
            setMessage({ text: "Success", color: "green" });
            checkbox.checked=false;
        } catch (error) {
            if (error.response) {
                console.error("The exact backend error:", error.response.data.error);
            }
        }
    };
    return(
        <div className= "bg-light shadow-sm p-3 rounded-3 container mt-5">
        <div className="row">
            <div className="col-md-6 bg-light">
            <h1>Create Account</h1>
            <p>Fill in the details to get started</p>
            <form onSubmit={handleRegister}>
                <label htmlFor="name" className="form-label mb-1">Full Name</label>
                <input type="text" id="fullName" placeholder="Enter your name" value={details.fullName} onChange={handleChange} className="mb-1 form-control"/>
                <label htmlFor="email" className="form-label mb-1">Email</label>
                <input type="email" id="email"  placeholder="Enter your email" className=" mb-1 form-control"  onChange={handleChange} value={details.email}/>
                <label htmlFor="pass" className="form-label mb-1">Password</label>
                <input type="password" id="password" placeholder="Enter your password" className="form-control mb-1" onChange={handleChange} value={details.password}/>
                <label htmlFor="pass" className="form-label mb-1">Confirm Password</label>
                <input type="password" id="cpassword" placeholder="Confirm your pass word" className="form-control mb-1"  onChange={handleChange} value={details.cpassword}/>
                <div><input type="checkbox" id="check" /><span> I agree to the <a href="#">Terms of Service </a> and <a href="#">Privacy Policy</a></span>
                </div>
                <p style={{ color: message.color }} className="mt-2 fw-bold">{message.text}</p>
                <button type="submit" id="login" className="text-white bg-primary rounded-2 border-0 p-2 mb-1 w-50" >Register</button>
            </form>
            <div className="last"><span className="text-gray">Already have an account? </span><Link to='/login'>Login here</Link></div></div>
        <div className="col-md-6 position-relative p-0 " >
            <img src={login} 
                        className="w-100 h-100 object-fit-cover" 
                        alt="Login Background rounded-3" />
            <div 
        className="position-absolute start-0 w-100 h-25 bg-dark bg-opacity-50 text-white d-flex flex-column justify-content-center align-items-center p-3 text-center"
        style={{ top: "25%" }}
    >
        <h2 className="m-0 fw-bold">Welcome</h2>
        <p className="m-0 small">Get registered and start your journey</p>
    </div></div>
        </div>
    </div>
    )
}