
import { FC } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ListUsers from '../components/ListUsers';
import Navbar from '../components/NavBar';


const Home: FC = () => {
    return (
        <div>
          
            <div> <ListUsers title="Liste des utilisateurs" /></div>
            
        </div>
    )
}


export default Home;