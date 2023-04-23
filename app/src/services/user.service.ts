import User from '../types/User';

const getUsers = async () => {
    const requestOptions = {
        method: 'GET',
    };
    try {
        const response = await fetch('http://localhost:8080/users', requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const createUser = async (user: User) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };
    try {
        const response = await fetch('http://localhost:8080/users', requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const getUser = async (userId: any) => {
    const requestOptions = {
        method: 'GET',
    };
    try {
        const response = await fetch('http://localhost:8080/users/' + userId, requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (user: User) => {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };
    console.log(requestOptions)
    try {
        const response: Response = await fetch('http://localhost:8080/users/' + user._id, requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (user: User) => {
    const requestOptions = {
        method: 'DELETE',
    };
    try {
        await fetch('http://localhost:8080/users/' + user._id, requestOptions);
    } catch (error) {
        console.log(error);
    }
}

export {getUsers, createUser, getUser, updateUser, deleteUser};