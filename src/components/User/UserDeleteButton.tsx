import {FC} from 'react';
import {IoTrashBinSharp} from 'react-icons/io5';
import {confirmAlert} from 'react-confirm-alert';
import * as UserService from '../../services/user.service';
import User from "../../types/User";

interface Props {
    user: User;
}

const UserDeleteButton: FC<Props> = ({user}: Props) => {

    // Alerte de confirmation de suppression d'un utilisateur
    const alertDeleteUser = (user: User) => {
        confirmAlert({
            title: 'Confirmation de suppression',
            message: `Êtes vous sûr de vouloir supprimer l'utilisateur : ${user?.name} (${user?.email}) ?`,
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => {
                        UserService.deleteUser(user);
                        window.location.reload();
                    }
                },
                {
                    label: 'Non'
                }
            ]
        });
    }

    // Affichage du tableau d'utilisateurs
    return (
        <button className='iconButton' onClick={() => alertDeleteUser(user)} title="Supprimer">
            <IoTrashBinSharp/>
        </button>
    )
}

export default UserDeleteButton;