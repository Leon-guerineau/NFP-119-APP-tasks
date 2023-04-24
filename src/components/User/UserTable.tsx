import {FC, useState} from 'react';
import {IoPencilSharp, IoNewspaperSharp} from 'react-icons/io5';
import {updateUser} from '../../services/user.service';
import User from "../../types/User";
import Modal from '../Modal';
import UserForm from './UserForm';
import {Link} from "react-router-dom";
import UserDeleteButton from "./UserDeleteButton";

interface Props {
    users: User[];
}
const UserTable: FC<Props> = ({users}:Props) => {
    const [isOpenUpdateForm, setOpenUpdateForm] = useState('');

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
            {users?.map((user, key) => {
                return (
                    <tr key={key}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <Link to={'/users/' + user._id + '/tasks'}>
                                <button className='iconButton' title="Lister les taĉhes">
                                    <IoNewspaperSharp/>
                                </button>
                            </Link>

                            <button className='iconButton' onClick={() => setOpenUpdateForm(user._id)} title="Modifier">
                                <IoPencilSharp/>
                            </button>
                            <Modal
                                isOpen={isOpenUpdateForm === user._id}
                                onClose={() => setOpenUpdateForm('')}
                                title="Modifier un utilisateur"
                                content={<UserForm onSubmit={sendUpdateUser} user={user}/>}
                            />

                            <UserDeleteButton user={user}/>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default UserTable;