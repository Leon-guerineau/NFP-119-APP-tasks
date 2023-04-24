import {FC, useEffect, useState} from "react";
import TaskTable from "../components/Task/TaskTable";
import Task from "../types/Task";
import {getTasks} from "../services/task.service";

const TaskList: FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Récupération des tâches
    useEffect(() => {
        async function getData() {
            const tasks: Task[] = await getTasks();
            setTasks(tasks);
        }
        getData();
    });

    // Affichage s'il n'y a pas de tâches
    if (tasks.length === 0) {
        return (
            <div>
                <h1>Aucune tâches</h1>
            </div>
        );
    }

    // Affichage des tâches
    return (
        <div>
            <h2>Liste des tâches</h2>
            <TaskTable tasks={tasks}/>
        </div>
    )
}

export default TaskList;