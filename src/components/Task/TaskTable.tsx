import {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getUser} from "../../services/user.service";
import Task from "../../types/Task";
import User from "../../types/User";
import TaskDeleteButton from "./TaskDeleteButton";
import TaskUpdateButton from "./TaskUpdateButton";

interface Props {
    tasks: Task[];
}

const TaskTable: FC<Props> = ({ tasks }: Props) => {
    const [users, setUsers] = useState<User[]>([]);

    // Récupération des utilisateurs de chaque tâche
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await Promise.all(tasks.map(task => getUser(task.userId)));
            setUsers(users);
        }
        fetchUsers();
    });

    // Retour du tableau de tâches
    return (
        <div>
            <table className='center'>
                <thead>
                    <tr>
                        <th>Utilisateur</th>
                        <th>Nom</th>
                        <th>Détail</th>
                        <th>Terminée</th>
                        <th>Date de création</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {/* Lignes du tableau */}
                    {tasks?.map((task, key) => {
                        // Recherche de l'utilisateur de la tâche
                        const user = users.find(user => user?._id === task.userId);
                        return (
                            <tr key={key}>
                                {/* Lien vers la liste des tâches pour l'utilisateur */}
                                <td>
                                    <Link to={'/users/' + user?._id + '/tasks'}>
                                        {user?.email}
                                    </Link>
                                </td>

                                {/* Nom de la tâche */}
                                <td>{task.name}</td>

                                {/* Détail de la tâche */}
                                <td>{task.detail}</td>

                                {/* Tâche terminée ? */}
                                <td><input type='checkbox' checked={task.finished} readOnly={true}/></td>

                                {/* Date de création de la tâche */}
                                <td>{task.createdAt.toString().split("T")[0]}</td>

                                {/* Actions de la tâche */}
                                <td>
                                    <TaskUpdateButton task={task}/>
                                    <TaskDeleteButton task={task}/>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TaskTable;