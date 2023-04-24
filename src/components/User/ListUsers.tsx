import {FC, useState, useEffect} from 'react';
import {IoPencilSharp, IoTrashBinSharp, IoNewspaperSharp} from 'react-icons/io5';
import {getUsers, deleteUser, createUser, updateUser} from '../../services/user.service';
import {confirmAlert} from 'react-confirm-alert';
import User from "../../types/User";
import Modal from '../Modal';
import UserForm from './UserForm';
import {Link} from "react-router-dom";

const ListUsers: FC = () => {
    const [users, setUsers] = useState<User[] | null>([]);
    const [isOpenForm, setOpenForm] = useState(false);
    const [isOpenUpdateForm, setOpenUpdateForm] = useState('');
    const [refresh, setRefresh] = useState(0);

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
                        setRefresh(refresh + 1);
                    }
                },
                {
                    label: 'Non'
                }
            ]
        });
    }

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

    // Mise à jour d'un utilisateur
    const sendUpdateUser = (formData: any) => {
        setOpenUpdateForm('');
        const update = async (userUpdate: User) => {
            await updateUser(userUpdate);
            setRefresh(refresh + 1);
        }
        update(formData);
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
        </div>
    )
}

export default ListUsers