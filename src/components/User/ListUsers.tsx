import {FC, useState, useEffect} from 'react';
import {getUsers} from '../../services/user.service';
import User from "../../types/User";
import UserTable from "./UserTable";
import UserCreateButton from "./UserCreateButton";

const ListUsers: FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    // Récupération des utilisateurs
    useEffect(() => {
        async function getData() {
            const users: User[] = await getUsers();
            setUsers(users);
        }
        getData();
    });

    // Retour de l'affichage
    return (
        <div>
            <UserCreateButton/>
            <UserTable users={users}/>
        </div>
    )
}

export default ListUsers;