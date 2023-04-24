import {FC, useState} from 'react';
import {IoPencilSharp, IoTrashBinSharp, IoNewspaperSharp} from 'react-icons/io5';
import {deleteUser, updateUser} from '../../services/user.service';
import {confirmAlert} from 'react-confirm-alert';
import User from "../../types/User";
import Modal from '../Modal';
import UserForm from './UserForm';
import {Link} from "react-router-dom";

interface Props {
    users: User[];
}
const UserTable: FC<Props> = ({users}:Props) => {
    const [isOpenUpdateForm, setOpenUpdateForm] = useState('');

    // Alerte de confirmation de suppression d'un utilisateur
    const alertDeleteUser = (user: User) => {
        confirmAlert({
            title: 'Confirmation de suppression',
            message: `Êtes vous sûr de vouloir supprimer l'utilisateur : ${user?.name} (${user?.email}) ?`,
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => {
                        deleteUser(user);
                        window.location.reload();
                    }
                },
                {
                    label: 'Non'
                }
            ]
        });
    }

    // Mise à jour d'un utilisateur
    const sendUpdateUser = (formData: any) => {
        setOpenUpdateForm('');
        const update = async (userUpdate: User) => {
            await updateUser(userUpdate);
            window.location.reload();
        }
        update(formData);
    }

    // Affichage s'il n'y a aucun utilisateur
    if (users.length === 0) {
        return (<h1>Aucun utilisateur</h1>)
    }

    // Affichage du tableau d'utilisateurs
    return (
        <table className='center'>
            <thead>
            <tr>
                <th>Nom</th>
                <th>Mail</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {users?.map((val, key) => {
                return (
                    <tr key={key}>
                        <td>{val.name}</td>
                        <td>{val.email}</td>
                        <td>
                            <Link to={'/users/' + val._id + '/tasks'}>
                                <button className='iconButton' title="Lister les taĉhes">
                                    <IoNewspaperSharp/>
                                </button>
                            </Link>

                            <button className='iconButton' onClick={() => setOpenUpdateForm(val._id)} title="Modifier">
                                <IoPencilSharp/>
                            </button>
                            <Modal
                                isOpen={isOpenUpdateForm === val._id}
                                onClose={() => setOpenUpdateForm('')}
                                title="Modifier un utilisateur"
                                content={<UserForm onSubmit={sendUpdateUser} user={val}/>}
                            />

                            <button className='iconButton' onClick={() => alertDeleteUser(val)} title="Supprimer">
                                <IoTrashBinSharp/>
                            </button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default UserTable;