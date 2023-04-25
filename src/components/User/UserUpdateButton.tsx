import {FC, useState} from 'react';
import {IoPencilSharp} from 'react-icons/io5';
import * as UserService from '../../services/user.service';
import User from "../../types/User";
import Modal from '../Modal';
import UserForm from './UserForm';
import {toast} from "react-toastify";

interface Props {
    user: User;
}

const UserUpdateButton: FC<Props> = ({user}: Props) => {
    const [isOpenForm, setOpenForm] = useState('');

    // Mise à jour d'un utilisateur
    const sendUpdateUser = (formData: any) => {
        const update = async (userUpdate: User) => {
            const result = await UserService.updateUser(userUpdate);

            if (result.error?.code === 11000) {
                toast.warning('L\'email '+formData.email+' est déjà utilisé');
                setOpenForm(user._id)
            } else {
                toast.success('Utilisateur '+formData.email+' modifié');
                setOpenForm('');
            }
        }
        update(formData);
    }

    // Affichage du bouton de modification d'un utilisateur
    return (
        <span>
            <button className='iconButton' onClick={() => setOpenForm(user._id)} title="Modifier">
                <IoPencilSharp/>
            </button>
            <Modal
                isOpen={isOpenForm === user._id}
                onClose={() => setOpenForm('')}
                title="Modifier un utilisateur"
                content={<UserForm onSubmit={sendUpdateUser} user={user}/>}
            />
        </span>
    );
}

export default UserUpdateButton;