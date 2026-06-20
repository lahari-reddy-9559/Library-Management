import login from '/src/images/back/loginn.png'
import { Link ,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
export default function Login(){
    const navigate=useNavigate();
    const [message, setMessage] = useState({ text: '', color: '' });
    const [details,setDetails]=useState({
        'email':'',
        'password':'',
    })
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = details;
        if (email.length < 9) {
            setMessage({ text: "Please enter a valid email address.", color: "red" });
            return;
        }
        if (!password) {
            setMessage({ text: "Password field cannot be empty.", color: "red" });
            return;
        }
        const loginData = { email, password};
        try {
            const response=await axios.post(
                    "https://library-api.vercel.app/api/login",
                    loginData,
                );
                localStorage.setItem("token",response.data.token);
                localStorage.setItem('user',JSON.stringify(response.data.user));
                navigate('/dashboard');
        } catch (error) {
    if (error.response) {
        const backendError = error.response.data.error;
        const safeStringMessage = typeof backendError === 'object' 
            ? (backendError.message || JSON.stringify(backendError)) 
            : backendError;

        setMessage({ 
            text: safeStringMessage || "Invalid Credentials", 
            color: "red" 
        });
        console.error("Backend login error:", safeStringMessage);
    } else {
        setMessage({ text: "Server unreachable. Is your backend running?", color: "red" });
    }
}
    };
    const handleChange = (e) => {
        const { id, value } = e.target;
        setDetails((prev) => {
            const nextState = { ...prev, [id]: value };
            return nextState;
        });
    };
    return(
        <div className='bg-light shadow-sm m-3 mt-5 p-3 rounded-3'>
        <div className="row">
        <div className="col-md-6 position-relative p-0 container">
            <img src={login} className='w-100 h-100 object-fit-cover'/>
       <div className="position-absolute start-0 w-100 h-25 bg-dark bg-opacity-50 text-white d-flex flex-column justify-content-center align-items-center p-3 text-center rounded-3"
        style={{ top: "25%" }}>
        <h2 className="m-0 fw-bold">Welcome Back</h2>
        <p className="m-0 small">Glad to see you again! please login to continue your journey</p>
    </div>
        </div>
        <div className='col-md-6 mt-5'>
            <div className='container ml-2'>
            <h1>Welcome Back</h1>
            <p>Login to your account to continue</p>
            <form onSubmit={handleLogin}>
                <label htmlFor="email" className='form-label'>Email</label>
                <input type="email" id="email"  value={details.email} onChange={handleChange} placeholder="Enter your email" className='form-control mb-2'/>
                <label htmlFor="pass" className='form-label'>Password</label>
                <input type="password" id="password" onChange={handleChange} placeholder="Enter your password" value={details.password} className='form-control mb-2'/>
                <div className='row m-3'> <div className='col-md-6 '><input type="checkbox" id='check'/><label className='form-label ml-1' htmlFor='check-box'> Remember me</label></div>
                <div  className='col-md-6'><a href="#">Forgot Password?</a></div></div>
               {message.text && (
                            <p style={{ color: message.color }} className="mt-2 fw-bold">
                                {message.text}
                            </p>
                        )}
                <button type="submit" id="login" className='btn btn-primary w-100'>Login</button>
                <div className='text-center mt-2'><p>or</p></div>
                <button type="button" className='btn btn-light w-100'>Login with google</button>
            </form></div>
            <div className="container m-2 text-center"><span style={{color:'gray'}}>Don't have an account??</span><Link to='/register'> register here</Link></div>
        </div>
    </div>
    </div>
    )
}
    
    