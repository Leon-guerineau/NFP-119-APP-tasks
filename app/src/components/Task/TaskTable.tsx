import {FC, useState} from 'react';
import Task from "../../types/Task";
import {IoPencilSharp, IoTrashBinSharp} from "react-icons/io5";
import {confirmAlert} from "react-confirm-alert";
import {deleteTask, updateTask} from "../../services/task.service";
import Modal from "../Modal";
import TaskForm from "./TaskForm";

interface Props {
    tasks: Task[];
}

const TaskTable: FC<Props> = ({ tasks }: Props) => {
    const [isOpenUpdateForm, setOpenUpdateForm] = useState('');
    const [refresh, setRefresh] = useState(0);

    const alertDeleteTask = (task: Task) => {
        confirmAlert({
            title: 'Confirmation de suppression',
            message: `Êtes vous sûr de vouloir supprimer la tâche : ${task?.name} ?`,
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => {
                        deleteTask(task);
                        window.location.reload();
                    }
                },
                {
                    label: 'Non',
                    onClick: () => null
                }
            ]
        });
    }

    const sendUpdateTask = (formData: any) => {
        setOpenUpdateForm('');
        const update = async (taskUpdate: Task) => {
            await updateTask(taskUpdate);
            setRefresh(refresh + 1);
        }
        update(formData);
    }

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
                {tasks?.map((task, key) => {

                    return (
                        <tr key={key}>
                            <td>{task.userId}</td>
                            <td>{task.name}</td>
                            <td>{task.detail}</td>
                            <td><input type='checkbox' checked={task.finished} readOnly={true}/></td>
                            <td>{task.createdAt.toString().split("T")[0]}</td>
                            <td>
                                <button className='iconButton' onClick={() => setOpenUpdateForm(task._id)} title="Modifier">
                                    <IoPencilSharp/>
                                </button>
                                <Modal
                                    isOpen={isOpenUpdateForm === task._id}
                                    onClose={() => setOpenUpdateForm('')}
                                    title="Modifier un utilisateur"
                                    content={<TaskForm onSubmit={sendUpdateTask} task={task} userId={task.userId}/>}
                                />

                                <button className='iconButton' onClick={() => alertDeleteTask(task)} title="Supprimer">
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

export default TaskTable