import {FC, useState, useEffect} from 'react';
import {getUsers, createUser} from '../../services/user.service';
import User from "../../types/User";
import Modal from '../Modal';
import UserForm from './UserForm';
import UserTable from "./UserTable";

const ListUsers: FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isOpenForm, setOpenForm] = useState(false);
    const [refresh, setRefresh] = useState(0);

    // Récupération des utilisateurs
    useEffect(() => {
        async function getData() {
            const users: User[] = await getUsers();
            setUsers(users);
        }
        getData();
    }, [refresh]);

    // Création d'un nouvel utilisateur
    const sendNewUser = (userData: any) => {
        setOpenForm(false);
        const addUser = async (user: User) => {
            await createUser(user);
            setRefresh(refresh + 1);
        }
        addUser(userData);
    }

    // Retour de l'affichage
    return (
        <div>
            <div>
                <button onClick={() => setOpenForm(true)}>Ajouter un utilisateur</button>
                <Modal
                    isOpen={isOpenForm}
                    onClose={() => setOpenForm(false)}
                    title="Enregistrer un utilisateur"
                    content={<UserForm onSubmit={sendNewUser}/>}
                />
            </div>
            <UserTable users={users}/>
        </div>
    )
}

export default ListUsers