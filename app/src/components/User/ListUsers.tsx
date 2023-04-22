import {FC, useState, useEffect} from 'react';
import {IoPencilSharp, IoTrashBinSharp, IoNewspaperSharp} from 'react-icons/io5';
import {getUsers, deleteUser, createUser, updateUser} from '../../services/user.service';
import {confirmAlert} from 'react-confirm-alert';
import User from "../../types/User";
import Modal from '../Modal';
import UserForm from './UserForm';

const ListUsers: FC = () => {
    const [users, setUsers] = useState<User[] | null>([]);
    const [isOpenForm, setOpenForm] = useState(false);
    const [isOpenUpdateForm, setOpenUpdateForm] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const onclick = () => {
        alert('click button')
    };

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
                    label: 'Non',
                    onClick: () => null
                }
            ]
        });
    }

    useEffect(() => {
        async function getData() {
            const users: User[] = await getUsers();
            setUsers(users);
        }
        getData();
    }, [refresh]);


    const sendNewUser = (formData: any) => {
        setOpenForm(false);
        const add = async (userAdd: User) => {
            const user = await createUser(userAdd);
            setRefresh(refresh + 1);
        }
        add(formData);
    }

    const sendUpdateUser = (formData: any) => {
        setOpenUpdateForm(false);
        const update = async (userUpdate: User) => {
            await updateUser(userUpdate);
            setRefresh(refresh + 1);
        }
        update(formData);
    }

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
                                    <button className='iconButton' title="Lister les taĉhes">
                                        <IoNewspaperSharp/>
                                    </button>
                                    <button className='iconButton' onClick={() => setOpenUpdateForm(true)} title="Modifier">
                                        <IoPencilSharp/>
                                    </button>
                                    <Modal
                                        isOpen={isOpenUpdateForm}
                                        onClose={() => setOpenUpdateForm(false)}
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