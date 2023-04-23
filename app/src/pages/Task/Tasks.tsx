import {FC, useEffect, useState} from "react";
import TaskTable from "../../components/Task/TaskTable";
import Task from "../../types/Task";
import {getTasks} from "../../services/task.service";

const Tasks: FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        async function getData() {
            const tasks: Task[] = await getTasks();
            setTasks(tasks);
        }
        getData();
    });

    return (
        <div>
            <h3>Liste des tâches</h3>
            <TaskTable tasks={tasks}/>
        </div>
    )
}

export default Tasks;