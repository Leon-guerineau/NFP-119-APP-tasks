import React, {useState} from "react";
import User from "../../types/User";
import Task from "../../types/Task";

interface FormProps {
    onSubmit: (formData: FormData) => void;
    task?: Task | null;
    userId?: string;
}

function formatDate(date?: Date): string {
    let formatedDate = new Date().toISOString().split("T")[0];
    if (date) {
        formatedDate = new Date(date).toISOString().split("T")[0];
    }
    return formatedDate;
}

interface FormData {
    _id?: string | null;
    userId: string;
    name: string;
    detail: string;
    finished: boolean;
    createdAt: Date;
}

const TaskForm = ({onSubmit, task, userId}: FormProps) => {
    const [formData, setFormData] = useState<FormData>({
        _id: task ? task._id : null,
        userId: userId ?? '',
        name: task && task.name ? task.name : '',
        detail: task && task.detail ? task.detail : '',
        finished: task && task.finished ? task.finished : false,
        createdAt: task && task.createdAt ? new Date(task.createdAt) : new Date(),
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        if (event.target.name === 'finished') {
            console.log(event.target.checked)
            setFormData((prevFormData) => ({...prevFormData, [name]: event.target.checked}));
        } else if (event.target.name === 'createdAt') {
            setFormData((prevFormData) => ({...prevFormData, [name]: new Date(event.target.value.toString())}));
        } else {
            setFormData((prevFormData) => ({...prevFormData, [name]: value}));
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log('submit', formData)
        event.preventDefault();
        onSubmit(formData);
        setFormData({
            userId: '',
            name: '',
            detail: '',
            finished: false,
            createdAt: new Date(),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nom :
                <input type="text" name="name" value={formData.name} onChange={handleChange}/>
            </label>

            <label>
                Détail :
                <input type="text" name="detail" value={formData.detail} onChange={handleChange}/>
            </label>

            <label>
                Terminée :
                <input type="checkbox" name="finished" onChange={handleChange} defaultChecked={formData.finished}/>
            </label>

            <label>
                Date de création :
                <input type="date" name="createdAt" value={new Date(formData.createdAt).toISOString().split("T")[0]} onChange={handleChange}/>
            </label>

            <button type="submit">Envoyer</button>
        </form>
    );
}

export default TaskForm;