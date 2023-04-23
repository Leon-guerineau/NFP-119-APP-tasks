import Task from "../types/Task";
import User from "../types/User";

const getTasks = async () => {
    const requestOptions = {
        method: 'GET',
    };
    try {
        const response = await fetch('http://localhost:8080/tasks', requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const getTasksByUserId = async (userId: any) => {
    const requestOptions = {
        method: 'GET',
    };
    try {
        const response = await fetch('http://localhost:8080/users/' + userId + '/tasks', requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const createTask = async (task: Task) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    };
    try {
        const response = await fetch('http://localhost:8080/tasks', requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const updateTask = async (task: Task) => {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    };
    try {
        const response: Response = await fetch('http://localhost:8080/tasks/' + task._id, requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const deleteTask = async (task: Task) => {
    const requestOptions = {
        method: 'DELETE',
    };
    try {
        await fetch('http://localhost:8080/tasks/' + task._id, requestOptions);
    } catch (error) {
        console.log(error);
    }
}

export {getTasks, getTasksByUserId, createTask, deleteTask, updateTask};