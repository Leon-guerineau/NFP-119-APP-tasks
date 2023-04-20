import { FC } from "react";
import ListUsers from '../components/ListUsers';

const Home: FC = () => {
    return (
        <div>
            <ListUsers title="Liste des utilisateurs" />
        </div>
    )
}

export default Home;