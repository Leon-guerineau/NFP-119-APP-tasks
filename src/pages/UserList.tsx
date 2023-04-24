import {FC, useEffect, useState} from "react";
import User from "../types/User";
import {getUsers} from "../services/user.service";
import UserCreateButton from "../components/User/UserCreateButton";
import UserTable from "../components/User/UserTable";

const UserList: FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    // Récupération des utilisateurs
    useEffect(() => {
        async function getData() {
            const users: User[] = await getUsers();
            setUsers(users);
        }
        getData();
    });

    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            <UserCreateButton/>
            <UserTable users={users}/>
        </div>
    )
};

export default UserList;