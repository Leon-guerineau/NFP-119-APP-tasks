import { FC } from "react";
import ListUsers from '../components/User/ListUsers';

const UserList: FC = () => {
    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            <ListUsers/>
        </div>
    )
};

export default UserList;