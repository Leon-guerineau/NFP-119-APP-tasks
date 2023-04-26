import {FC, useState} from 'react';
import * as UserService from '../../services/user.service';
import User from "../../types/User";
import Modal from '../Modal';
import UserForm from './UserForm';
import {toast} from "react-toastify";
import {log} from "util";

const UserCreateButton: FC = () => {
    const [isOpenForm, setOpenForm] = useState(false);

    // Création d'un nouvel utilisateur
    const sendNewUser = (userData: any) => {
        const addUser = async (user: User) => {
            if (user.email === '') {
                toast.warning('L\'email ne peut être vide');
                return;
            }
            const result = await UserService.createUser(user);
            // Gestion de l'erreur 'Duplicated key'
            if (result.error?.code === 11000) {
                toast.warning('L\'email '+user.email+' est déjà utilisé');
            } else {
                toast.success('Utilisateur '+user.email+' créé avec succès');
                setOpenForm(false);
            }
        }
        addUser(userData);
    }

    // Affichage du bouton de création d'un utilisateur
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
    );
}

export default UserCreateButton;