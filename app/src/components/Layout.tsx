import {FC} from "react";
import {Outlet} from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import '../assets/css/App.css';

const Layout: FC = () => {
    return (
        <div className="App">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Layout;