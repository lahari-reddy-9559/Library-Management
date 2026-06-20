import { Link ,useNavigate} from "react-router-dom"
export default function sideNav(){
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }
    return(
        <div style={{margin:'0px',width:'200px',backgroundColor:'#292426',color:'white',minHeight:'100vh',padding:'20px'}}>
            
            <Link style={{color:'white' ,textDecoration:'None' ,display:'block', marginBottom:'20px'}} to='/dashboard'>Home</Link>
            {/* <Link style={{color:'white' ,textDecoration:'None',display:'block', marginBottom:'20px'}} to='/dashboard/courses'>Courses</Link> */}
            <Link style={{color:'white' ,textDecoration:'None',display:'block', marginBottom:'20px'}} to='/dashboard/about'>About</Link>
            <Link style={{color:'white',textDecoration:'None' ,display:'block', marginBottom:'20px'}} to='/dashboard/add'>Add Books</Link>
            <Link style={{color:'white',textDecoration:'None',display:'block', marginBottom:'20px'}} to="/dashboard/issue">Issue Books</Link>
            <Link style={{color:'white' ,textDecoration:'None' ,display:'block', marginBottom:'20px'}} to="/dashboard/list">List Books</Link>
            <Link style={{color:'white' ,textDecoration:'None' ,display:'block', marginBottom:'20px'}} to='/dashboard/contact'>Contact</Link>
            <button onClick={handleLogout} style={{color:'black',borderRadius:'5px',padding:'2px 3px'}}>Logout</button>
        </div>
    )
}