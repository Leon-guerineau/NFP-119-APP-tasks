import {FC, useState} from 'react';
import {createUser} from '../../services/user.service';
import User from "../../types/User";
import Modal from '../Modal';
import UserForm from './UserForm';

const UserCreateButton: FC = () => {
    const [isOpenForm, setOpenForm] = useState(false);

    // Création d'un nouvel utilisateur
    const sendNewUser = (userData: any) => {
        setOpenForm(false);
        const addUser = async (user: User) => {
            await createUser(user);
            window.location.reload();
        }
        addUser(userData);
    }

    // Retour du boutton
    return (
        <div>
            <button onClick={() => setOpenForm(true)}>Ajouter un utilisateur</button>
            <Modal
                isOpen={isOpenForm}
                onClose={() => setOpenForm(false)}
                title="Enregistrer un utilisateur"
                content={<UserForm onSubmit={sendNewUser}/>}
            />
        </div>
    )
}

export default UserCreateButton;