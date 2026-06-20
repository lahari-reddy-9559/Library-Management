import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SideNav from "./SideNav"
export default function Layout(){
    return(
        <div className="sticky-top top-0 w-100" syle={{maxHeight:'100vh'}}>
            <Header />
            <div className="row">
                <div className="col-md-2">
                <SideNav />
                </div>
                <div className="col-md-10">
                <main>
                    <Outlet />
                </main>
                </div>
            </div>
            <Footer />
            
        </div>
    )
}