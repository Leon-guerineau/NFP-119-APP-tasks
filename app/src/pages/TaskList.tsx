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

    return (
        <div>
            <h2>Liste des tâches</h2>
            <TaskTable tasks={tasks}/>
        </div>
    )
}

export default TaskList;