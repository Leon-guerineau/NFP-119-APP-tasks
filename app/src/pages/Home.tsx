import { FC } from "react";
import ListUsers from '../components/User/ListUsers';

const Home: FC = () => {
    return (
        <div>
            <h3>Liste des utilisateurs</h3>
            <ListUsers/>
        </div>
    )
}

export default Home;