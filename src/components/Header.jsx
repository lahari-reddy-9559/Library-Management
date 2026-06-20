import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImg from '/src/images/courses/logo.png';

export default function Header() {
    return (
        <header className="navbar navbar-dark bg-dark shadow px-4 py-3 p-3 sticky-top align-items-center">
            <div className="container-fluid d-flex align-items-center justify-content-between">
                <Link to="/" className="d-flex align-items-center text-decoration-none text-white">
                    <img 
                        src={logoImg} 
                        alt="DKC Logo" 
                        className="img-fluid me-3" 
                        style={{ height: '50px', width: 'auto', objectFit: 'contain' }}
                    />
                    <div>
                        <h2 className="fs-4 mb-0 fw-bold tracking-wide text-light">
                            Digital Knowledge Center
                        </h2>
                        <small className="text-secondary d-none d-sm-block">
                            Your Gateway to Infinite Knowledge
                        </small>
                    </div>
                </Link>
            </div>
        </header>
    );
}