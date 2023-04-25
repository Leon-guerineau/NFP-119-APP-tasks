import {FC} from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header";
import '../assets/css/App.css';
import {ToastContainer} from "react-toastify";

const Layout: FC = () => {
    return (
        <div className="App">
            <ToastContainer position='top-center' draggable={false}/>
            <Header/>
            <Outlet/>
        </div>
    );
}

export default Layout;