import {FC, useEffect, useState} from "react";
import {useParams} from "react-router";
import {getUser} from "../services/user.service";
import User from "../types/User";
import Task from "../types/Task";
import {createTask, getTasksByUserId} from "../services/task.service";
import TaskTable from "../components/Task/TaskTable";
import Modal from "../components/Modal";
import TaskForm from "../components/Task/TaskForm";

const UserTasks: FC = () => {
    const {userId} = useParams();
    const [user, setUser] = useState<User|null>(null);
    const [tasks, setTasks] =  useState<Task[]>([]);
    const [isOpenForm, setOpenForm] = useState(false);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        async function getData() {
            const user: User = await getUser(userId);
            setUser(user);
            const tasks: Task[] = await getTasksByUserId(userId);
            setTasks(tasks);
        }
        getData();

    }, [refresh]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const sendNewTask = (formData: any) => {
        setOpenForm(false);
        const add = async (TaskAdd: Task) => {
            await createTask(TaskAdd);
            setRefresh(refresh + 1);
        }
        add(formData);
    }

    return (
        <div>
            <h2>Tâches de : {user.email}</h2>

            <div>
                <button onClick={() => setOpenForm(true)}>Ajouter une tâche</button>
                <Modal
                    isOpen={isOpenForm}
                    onClose={() => setOpenForm(false)}
                    title="Enregistrer une tâche"
                    content={<TaskForm onSubmit={sendNewTask} userId={user._id}/>}
                />
            </div>

            <TaskTable tasks={tasks}/>
        </div>
    )
}

export default UserTasks;