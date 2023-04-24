import {FC, useEffect, useState} from 'react';
import {IoPencilSharp} from "react-icons/io5";
import {Link} from 'react-router-dom';
import {updateTask} from "../../services/task.service";
import {getUser} from "../../services/user.service";
import Modal from "../Modal";
import TaskForm from "./TaskForm";
import Task from "../../types/Task";
import User from "../../types/User";
import TaskDeleteButton from "./TaskDeleteButton";

interface Props {
    tasks: Task[];
}

const TaskTable: FC<Props> = ({ tasks }: Props) => {
    const [isOpenUpdateForm, setOpenUpdateForm] = useState('');
    const [users, setUsers] = useState<User[]>([]);

    // Récupération des utilisateurs de chaque tâche
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await Promise.all(tasks.map(task => getUser(task.userId)));
            setUsers(users);
        }
        fetchUsers();
    });

    // Mise à jour d'une tâche
    const sendUpdateTask = (formData: any) => {
        setOpenUpdateForm('');
        const update = async (taskUpdate: Task) => {
            await updateTask(taskUpdate);
            window.location.reload();
        }
        update(formData);
    }

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
                                    {/* Boutton de modification */}
                                    <button className='iconButton' onClick={() => setOpenUpdateForm(task._id)} title="Modifier">
                                        <IoPencilSharp/>
                                    </button>
                                    <Modal
                                        isOpen={isOpenUpdateForm === task._id}
                                        onClose={() => setOpenUpdateForm('')}
                                        title="Modifier un utilisateur"
                                        content={<TaskForm onSubmit={sendUpdateTask} task={task} userId={task.userId}/>}
                                    />

                                    <TaskDeleteButton task={task}/>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TaskTable