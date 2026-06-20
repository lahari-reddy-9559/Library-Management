import {Link} from 'react-router-dom'
import background from '/src/images/back/back.png';
export default function Main(){
    return(
        <div>
            <img src={background} className='fit-object-cover w-100' style={{maxHeight:'100vh'}}/>
            <div className="position-absolute  w-100 h-0 text-dark justify-content-center align-items-center text-center"
        style={{ top: "40%" }}><h2 className='mt-0 mb-3'>Digital Knowledge Center</h2>
            <p className='mb-5'>Join us.... for infinite Knowledge</p>
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-3'>
                    <Link to='/login'><button className='btn btn-primary p-3 border-0 rounded-3 w-100'>Sign in </button></Link> 
                </div>
                <div className='col-md-3'>
                    <Link to='/register'><button className='btn btn-dark p-3 border-0 rounded-3 w-100'> Sign up</button></Link></div>
                    <div className='col-md-3'></div>
                </div>
            </div>
            
    
            
        </div>
    )
}